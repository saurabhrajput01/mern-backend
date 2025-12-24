const validate = (schema) => async (req, res, next) => {
  try {
    const parsed = await schema.parseAsync(req.body);
    req.body = parsed;
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const errorMessages = error.issues.map(issue => issue.message);
      return res.status(400).json({ msg: errorMessages.join(', ') });
    }
    next(error);
  }
};

module.exports = validate;
