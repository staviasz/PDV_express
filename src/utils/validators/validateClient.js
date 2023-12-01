const schemaClient = require('../schemas/schemaClient');
const validateSchema = require('./validateSchema');

const validateClient = async (database, schemaValues, id = null) => {
  const errorSchema = await validateSchema(schemaClient)(schemaValues);
  if (errorSchema) {
    return errorSchema;
  }
  const { cpf, email } = schemaValues;

  if (id != null) {
    if (!Number(id)) {
      return 'O id precisa ser um número';
    }
    const client = await database('clientes').where({ id }).first();
    if (!client) {
      return 'Cliente não encontrado';
    }
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
