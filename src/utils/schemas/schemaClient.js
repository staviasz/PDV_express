const Joi = require('joi');

const schemaClient = Joi.object({
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

  cpf: Joi.string().required().messages({
    'any.required': 'O campo cpf é obrigatório',
    'string.empty': 'O campo cpf é obrigatório',
  }),
});

module.exports = schemaClient;
