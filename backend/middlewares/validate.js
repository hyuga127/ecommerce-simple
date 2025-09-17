import Joi from "joi";

export const validate = (schema) => (req, res, next) => {
  let data = req.body;

  // nếu client gửi mảng => dùng Joi.array().items(schema)
  const finalSchema = Array.isArray(data) ? Joi.array().items(schema) : schema;

  const { error } = finalSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: error.details.map((err) => err.message),
    });
  }
  next();
};
