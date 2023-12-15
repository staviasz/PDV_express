const joi = require("joi");

const schemaProduct = joi.object({
  produto_id: joi.number().integer().required().messages({
    "any.required": "O campo produto_id é obrigatório",
    "number.base": "O campo produto_id deve ser um número",
    "number.empty": "O campo produto_id é obrigatório",
    "number.integer": "O campo produto_id deve ser um número inteiro",
  }),
  quantidade_produto: joi.number().integer().min(1).required().messages({
    "any.required": "O campo quantidade_produto é obrigatório",
    "number.base": "O campo quantidade_produto deve ser um número",
    "number.empty": "O campo quantidade_produto é obrigatório",
    "number.integer": "O campo quantidade_produto deve ser um número inteiro",
    "number.min": "O campo quantidade_produto deve ser pelo menos {#limit}",
  }),
});

const schemaOrder = joi.object({
  customer_id: joi.number().integer().required().messages({
    "any.required": "O campo cliente_id é obrigatório",
    "number.base": "O campo cliente_id deve ser um número",
    "number.empty": "O campo cliente_id é obrigatório",
    "number.integer": "O campo cliente_id deve ser um número inteiro",
  }),
  order_products: joi.array().items(schemaProduct).min(1).required().messages({
    "any.required": "O campo pedido_produtos é obrigatório",
    "array.base": "O campo pedido_produtos deve ser um array",
    "array.empty": "O campo pedido_produtos é obrigatório",
    "array.min": "O campo pedido_produtos deve conter pelo menos {#limit} item",
  }),
});

module.exports = schemaOrder;
