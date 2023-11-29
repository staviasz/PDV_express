const Joi = require('joi');

const schemaUser = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿs-\s]+$/)
    .min(3)
    .required()
    .messages({
      'any.required': 'O campo nome é obrigatório',
      'string.empty': 'O campo nome é obrigatório',
      'string.base': 'O nome não deve conter numeros',
      'string.pattern.base': 'O nome não deve conter numeros',
      'string.min': 'O nome deve conter no minimo 3 caracteres',
    }),

  email: Joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
    'string.base': 'O email não deve conter numeros',
  }),

  password: Joi.string().min(5).max(25).required().messages({
    'string.empty': 'O campo senha é obrigatório',
    'any.required': 'O campo senha é obrigatório',
    'string.min': 'A senha deve conter entre 5 e 25 caracteres',
    'string.max': 'A senha deve conter entre 5 e 25 caracteres',
    'string.base': 'A senha não deve conter numeros',
  }),
});

module.exports = schemaUser;
