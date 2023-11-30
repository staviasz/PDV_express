const joi = require('joi');

const schemaProduct = joi.object({
  description: joi.string().min(5).max(255).required().messages({
    'any.required': 'O campo descrição é obrigatório',
    'string.empty': 'O campo descrição é obrigatório',
    'string.min': 'A descrição deve conter entre 5 e 255 caracteres',
    'string.max': 'A descrição deve conter entre 5 e 255 caracteres',
    'string.base': 'A descrição não deve conter numeros',
  }),

  amount: joi.number().required().messages({
    'any.required': 'O campo quantidade de estoque é obrigatório',
    'number.base': 'A quantidade de estoque deve conter apenas numeros',
  }),

  value: joi.number().required().messages({
    'any.required': 'O campo valor é obrigatório',
    'number.base': 'A valor deve conter apenas numeros',
  }),

  category_id: joi.number().required().messages({
    'any.required': 'O campo categoria_id é obrigatório',
    'number.base': 'A categoria_id deve conter apenas numeros',
  }),
});

module.exports = schemaProduct;
