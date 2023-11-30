const schemaClient = require('../schemas/schemaClient');
const validateSchema = require('./validateSchema');
const { cpf: CPF } = require('cpf-cnpj-validator');

const validateClient = async (database, schemaValues, id = null) => {
  const errorSchema = await validateSchema(schemaClient)(schemaValues);
  if (errorSchema) {
    return errorSchema;
  }

  const { cpf, email } = schemaValues;

  if (!CPF.format(cpf)) {
    return 'CPF inválido';
  }

  const emailExists = await database('clientes')
    .where({ email })
    .whereNot({ id })
    .first();
  if (emailExists) {
    return 'Email já cadastrado';
  }

  const cpfExists = await database('clientes')
    .where({ cpf })
    .whereNot({ id })
    .first();
  if (cpfExists) {
    return 'CPF já cadastrado';
  }

  return;
};

module.exports = validateClient;
