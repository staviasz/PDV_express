const Joi = require("joi");

const schemaClient = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿs-\s]+$/)
    .min(3)
    .max(255)
    .required()
    .messages({
      "any.required": "O campo nome é obrigatório",
      "string.empty": "O campo nome é obrigatório",
      "string.base": "O nome não deve conter numeros",
      "string.pattern.base": "O nome não deve conter numeros",
      "string.min": "O nome deve conter no minimo 3 caracteres",
      "string.max": "O nome deve conter no maximo 255 caracteres"
    }),

  email: Joi.string().email().required().messages({
    "string.email": "O campo email precisa ter um formato válido",
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.base": "O email não deve conter numeros"
  }),

  cpf: Joi.string()
    .required()
    .min(11)
    .max(14)
    .pattern(/^[0-9.-]+$/)
    .messages({
      "any.required": "O campo CPF é obrigatório",
      "string.empty": "O campo CPF é obrigatório",
      "string.min": "O CPF deve conter no minimo 11 caracteres",
      "string.max": "O CPF deve conter no maximo 14 caracteres",
      "string.pattern.base": "O CPF permite apenas digitos, (.) e (-)",
      "string.base": "O CPF não deve conter numeros"
    }),

  zipCode: Joi.string().length(8).pattern(/^\d+$/).messages({
    "string.empty": "O campo CEP não pode estar vazio",
    "string.length": "O CEP deve ter exatamente 8 dígitos",
    "string.pattern.base": "O CEP deve conter apenas números",
    "string.base": "O CEP não deve conter numeros"
  }),

  street: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿs-\s.]+$/)
    .max(255)
    .messages({
      "string.empty": "O campo rua não pode estar vazio",
      "string.base": "O campo rua não deve conter numeros",
      "string.pattern.base": "O campo rua não deve conter numeros",
      "string.max": "O campo rua deve conter no maximo 255 caracteres"
    }),

  number: Joi.string().pattern(/^\d+$/).max(20).messages({
    "string.empty": "O campo numero não pode estar vazio",
    "string.pattern.base": "O numero deve conter apenas digitos",
    "string.base": "O campo numero deve ser uma string",
    "string.max": "O campo numero deve conter no maximo 20 caracteres"
  }),

  neighborhood: Joi.string().max(255).messages({
    "string.empty": "O campo bairro não pode estar vazio",
    "string.base": "O campo bairro deve ser uma string",
    "string.max": "O campo bairro deve conter no maximo 255 caracteres"
  }),

  city: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿs-\s.]+$/)
    .max(255)
    .messages({
      "string.empty": "O campo cidade não pode estar vazio",
      "string.base": "O campo cidade deve ser uma string",
      "string.pattern.base":
        "O campo cidade não aceita digitos e caracteres especiais",
      "string.max": "O campo cidade deve conter no maximo 255 caracteres"
    }),

  state: Joi.string()
    .regex(/^[a-zA-ZÀ-ÿs-\s]+$/)
    .max(255)
    .messages({
      "string.empty": "O campo estado não pode estar vazio",
      "string.base": "O campo estado deve ser uma string",
      "string.pattern.base":
        "O campo estado não aceita digitos e caracteres especiais",
      "string.max": "O campo estado deve conter no maximo 255 caracteres"
    })
});

module.exports = schemaClient;
