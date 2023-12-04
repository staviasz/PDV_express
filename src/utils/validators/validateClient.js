const schemaClient = require('../schemas/schemaClient');
const validateSchema = require('./validateSchema');

const validateClient = async (database, schemaValues, id = null) => {
  const errorSchema = await validateSchema(schemaClient)(schemaValues);
  if (errorSchema) {
    return errorSchema;
  }
  const { cpf, email } = schemaValues;

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

const validateIdClient = async (database, id) => {
  if (!Number(id)) {
    return 'O id precisa ser um número';
  }
  const client = await database('clientes').where({ id }).first();
  if (!client) {
    return 'Cliente não encontrado';
  }
};

module.exports = validateIdClient;

module.exports = { validateClient, validateIdClient };
