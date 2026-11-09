const Booking = require("../models/Booking");
const Spot = require("../models/Spot");

const populateBooking = (query) => query
  .populate("spot", "spotNumber zone spotSize locationDescription rentalFee isActive")
  .populate("user", "name email tel role");

const parseBookingInput = ({ bookingDate, productType }) => {
  if (typeof bookingDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(bookingDate)) {
    return { error: "A valid bookingDate in YYYY-MM-DD format is required" };
  }
  const date = new Date(`${bookingDate}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== bookingDate) {
    return { error: "Invalid booking date" };
  }
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (date < today) return { error: "Booking date cannot be in the past" };
  if (typeof productType !== "string" || !productType.trim()) {
    return { error: "Product type must be a nonempty string" };
  }
  return { bookingDate: date, productType: productType.trim() };
};

const validateBooking = async ({ values, spotId, user, excludeId }) => {
  const parsed = parseBookingInput(values);
  if (parsed.error) return { status: 400, error: parsed.error };
  if (typeof spotId !== "string" || !/^[a-fA-F0-9]{24}$/.test(spotId)) {
    return { status: 400, error: "Exactly one valid vendor spot ID is required" };
  }
  const spot = await Spot.findOne({ _id: spotId, isActive: true });
  if (!spot) return { status: 404, error: "Vendor spot not found or inactive" };
  const exclude = excludeId ? { _id: { $ne: excludeId } } : {};
  const sameDay = { spot: spot.id, bookingDate: parsed.bookingDate, ...exclude };
  const duplicate = await Booking.findOne({ ...sameDay, user });
  if (duplicate) return { status: 409, error: "Member already has a booking for this spot on this date" };
  const occupied = await Booking.findOne(sameDay);
  if (occupied) return { status: 409, error: "Vendor spot is already booked on this date" };
  const count = await Booking.countDocuments({ user, bookingDate: parsed.bookingDate, ...exclude });
  if (count >= 3) return { status: 409, error: "Member can book at most 3 spots per day" };
  return { data: { ...parsed, spot: spot.id } };
};

const bookingError = (error, res, next) => {
  if (error.code === 11000) {
    return res.status(409).json({ success: false, error: "Vendor spot is already booked on this date" });
  }
  next(error);
};

exports.getBookings = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user.id };
    const bookings = await populateBooking(Booking.find(filter).sort({ bookingDate: 1, createdAt: 1 }));
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    next(error);
  }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await populateBooking(Booking.findById(req.params.id));
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    if (req.user.role !== "admin" && booking.user._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized to view this booking" });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

exports.createBooking = async (req, res, next) => {
  try {
    const validated = await validateBooking({ values: req.body, spotId: req.body.spot, user: req.user.id });
    if (validated.error) return res.status(validated.status).json({ success: false, error: validated.error });
    const booking = await Booking.create({ ...validated.data, user: req.user.id });
    res.status(201).json({ success: true, data: await populateBooking(Booking.findById(booking.id)) });
  } catch (error) {
    bookingError(error, res, next);
  }
};

exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    if (req.user.role !== "admin" && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized to edit this booking" });
    }
    const values = {
      bookingDate: req.body.bookingDate === undefined ? booking.bookingDate.toISOString().slice(0, 10) : req.body.bookingDate,
      productType: req.body.productType === undefined ? booking.productType : req.body.productType,
    };
    const spotId = req.body.spot === undefined ? booking.spot.toString() : req.body.spot;
    const validated = await validateBooking({ values, spotId, user: booking.user, excludeId: booking.id });
    if (validated.error) return res.status(validated.status).json({ success: false, error: validated.error });
    const updated = await Booking.findByIdAndUpdate(
      req.params.id, validated.data, { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ success: false, error: "Booking not found" });
    res.status(200).json({ success: true, data: await populateBooking(Booking.findById(updated.id)) });
  } catch (error) {
    bookingError(error, res, next);
  }
};

exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: "Booking not found" });
    if (req.user.role !== "admin" && booking.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, error: "Not authorized to delete this booking" });
    }
    await booking.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
