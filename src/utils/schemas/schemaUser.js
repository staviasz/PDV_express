const Joi = require('joi');

const schemaUser = Joi.object({
  name: Joi.string()
    .min(3)
    .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/)
    .required()
    .messages({
      'any.required': 'O campo nome é obrigatório',
      'string.empty': 'O campo nome é obrigatório',
      'string.pattern.base': 'O nome não deve conter numeros',
      'string.min': 'O nome deve conter no minimo 3 caracteres',
    }),

  email: Joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
  }),

  password: Joi.string().min(5).max(25).required().messages({
    'string.empty': 'O campo senha é obrigatório',
    'any.required': 'O campo senha é obrigatório',
    'string.min': 'A senha deve conter entre 5 e 25 caracteres',
    'string.max': 'A senha deve conter entre 5 e 25 caracteres',
  }),
});

module.exports = schemaUser;
