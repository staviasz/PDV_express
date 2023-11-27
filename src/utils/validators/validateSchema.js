const validateSchema = (schema) => async (schemaValues) => {
  try {
    console.log('objectValues', schemaValues);
    await schema.validateAsync(schemaValues);
    return;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

module.exports = validateSchema;
