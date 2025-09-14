import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  thumbnail: Joi.array().items(Joi.string().uri().required()).min(1).required(),
  categoryId: Joi.string().hex().length(24).required(), // validate ObjectId
  brand: Joi.string().optional(),
  discount: Joi.number().min(0).max(100).optional(),
  variants: Joi.array()
    .items(
      Joi.object({
        size: Joi.string().required(),
        color: Joi.string().required(),
        stock: Joi.number().min(0).required(),
      })
    )
    .optional(),
});
