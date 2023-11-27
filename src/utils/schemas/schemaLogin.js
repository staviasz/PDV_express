const joi = require('joi');

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
  }),

  password: joi.string().min(5).required().messages({
    'string.base': 'A senha deve ser uma string',
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha deve ter no minimo 5 caracteres',
  }),
});

module.exports = schemaLogin;
