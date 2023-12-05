const joi = require("joi");

const schemaProduct = joi.object({
  description: joi.string().min(5).max(255).required().messages({
    "any.required": "O campo descrição é obrigatório",
    "string.empty": "O campo descrição é obrigatório",
    "string.min": "A descrição deve conter entre 5 e 255 caracteres",
    "string.max": "A descrição deve conter entre 5 e 255 caracteres",
    "string.base": "A descrição não deve conter numeros",
  }),

  amount: joi.number().integer().required().positive().messages({
    "any.required": "O campo quantidade de estoque é obrigatório",
    "number.base": "A quantidade de estoque deve conter apenas numeros",
    "number.positive":
      "O campo quantidade de estoque não permite numeros negativo",
    "number.integer":
      "O campo quantidade de estoque não permite numeros com ponto flotuante",
  }),

  value: joi.number().integer().required().positive().messages({
    "any.required": "O campo valor é obrigatório",
    "number.base": "A valor deve conter apenas numeros",
    "number.integer":
      "O campo valor não permite numeros com ponto flotuante, digite o valor em centavos",
    "number.positive": "O campo valor não permite numeros negativo",
  }),

  category_id: joi.number().integer().positive().required().messages({
    "any.required": "O campo categoria_id é obrigatório",
    "number.base": "A categoria_id deve conter apenas numeros",
    "number.positive": "O campo categoria_id não permite numeros negativo",
    "number.integer":
      "O campo categoria_id não permite numeros com ponto flotuante",
  }),
});

module.exports = schemaProduct;
