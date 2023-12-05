const schemaLogin = require("../schemas/schemaLogin");
const validateSchema = require("./validateSchema");

const validateLogin = async (database, objectValues) => {
  const errorSchema = await validateSchema(schemaLogin)(objectValues);
  if (errorSchema) return errorSchema;

  const { email } = objectValues;
  const emailExists = await database("usuarios").where({ email }).first();
  if (!emailExists) return "Usuário não encontrado";

  return emailExists;
};

module.exports = validateLogin;
