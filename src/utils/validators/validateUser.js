const schemaUser = require('../schemas/schemaUser');
const validateSchema = require('./validateSchema');

const validateUser = async (database, schemaValues, id = null) => {
  const errorSchema = await validateSchema(schemaUser)(schemaValues);
  if (errorSchema) return errorSchema;

  const { email } = schemaValues;
  const emailExists = await database('usuarios')
    .where({ email })
    .whereNot({ id })
    .first();
  if (emailExists) return 'Email já cadastrado';
  return;
};

module.exports = validateUser;
