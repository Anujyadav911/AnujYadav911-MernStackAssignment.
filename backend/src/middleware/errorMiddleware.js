// 404 handler
const notFound = (req, res, next) => {
  res.status(404);
  res.json({ message: "Route not found" });
};

// Generic error handler
const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Server error"
  });
};

module.exports = {
  notFound,
  errorHandler
};







