import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().max(255).optional(),
  parentId: Joi.string().allow(null, ""),
});
