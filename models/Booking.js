const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    spot: { type: mongoose.Schema.Types.ObjectId, ref: "Spot", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookingDate: { type: Date, required: true },
    productType: { type: String, required: [true, "Please add a product type"], trim: true },
  },
  { timestamps: true }
);

// One booking per spot and UTC day, including bookings by the same member.
BookingSchema.index({ spot: 1, bookingDate: 1 }, { unique: true });
BookingSchema.index({ user: 1, bookingDate: 1 });

module.exports = mongoose.model("Booking", BookingSchema);
