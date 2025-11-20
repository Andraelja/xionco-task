const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan internal!",
    error: err.message,
  });
};

module.exports = errorHandler;