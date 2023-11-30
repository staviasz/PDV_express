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

  cpf: Joi.string()
    .required()
    .length(11)
    .pattern(/^\d+$/) // Garante que contenha apenas números
    .messages({
      'any.required': 'O campo CPF é obrigatório',
      'string.empty': 'O campo CPF é obrigatório',
      'string.length': 'O CPF deve ter exatamente 11 dígitos',
      'string.pattern.base': 'O CPF deve conter apenas números',
    }),
});

module.exports = schemaClient;
