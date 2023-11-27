const validateSchema = (schema) => async (schemaValues) => {
  try {
    await schema.validateAsync(schemaValues);
    return;
  } catch (error) {
    return error.message;
  }
};

module.exports = validateSchema;
