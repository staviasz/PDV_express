const joi = require('joi');

const schemaLogin = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email é obrigatório',
    'string.base': 'O email não deve conter numeros',
  }),

  password: joi.string().min(5).max(25).required().messages({
    'any.required': 'O campo senha é obrigatório',
    'string.empty': 'O campo senha é obrigatório',
    'string.min': 'A senha deve conter entre 5 e 25 caracteres',
    'string.max': 'A senha deve conter entre 5 e 25 caracteres',
    'string.base': 'A senha não deve conter numeros',
  }),
});

module.exports = schemaLogin;
