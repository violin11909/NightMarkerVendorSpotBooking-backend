// Coordinate spot and booking mutations within this Node.js process.
// The controllers still use the same async handler and next(error) pattern.
let pending = Promise.resolve();

exports.serialize = (handler) => async (req, res, next) => {
  const previous = pending;
  let release;
  pending = new Promise((resolve) => { release = resolve; });
  await previous;
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  } finally {
    release();
  }
};
