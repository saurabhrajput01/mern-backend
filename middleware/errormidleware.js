const errormiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  let message = err.message || "Backend error";
  
  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    const errorMessages = err.errors.map(error => error.message);
    message = errorMessages.join(', ');
    return res.status(400).json({ msg: message });
  }
  
  return res.status(status).json({ msg: message });
};

module.exports = errormiddleware;