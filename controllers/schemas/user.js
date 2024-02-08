const Joi = require("joi");

module.exports = {
  signup: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required(),
    firstName: Joi.string()
      .regex(/^[a-zA-Z]+$/, "alpha")
      .min(3)
      .max(23)
      .required(),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]+$/, "alpha")
      .min(3)
      .max(23)
      .required(),
  }),

  update: Joi.object({
    password: Joi.string().min(8).max(16).optional(),
    firstName: Joi.string()
      .regex(/^[a-zA-Z]+$/, "alpha")
      .min(3)
      .max(23)
      .optional(),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]+$/, "alpha")
      .min(3)
      .max(23)
      .optional(),
  }),
};
