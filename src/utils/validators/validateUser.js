const schemaUser = require('../schemas/schemaUser');
const validateSchema = require('./validateSchema');

const validateUser = async (database, objectValues) => {
  const errorSchema = await validateSchema(schemaUser)(objectValues);
  if (errorSchema) return errorSchema;

  const { email } = objectValues;
  const emailExists = await database('usuarios').where({ email }).first();
  if (emailExists) return 'Email já cadastrado';

  return;
};

module.exports = validateUser;
