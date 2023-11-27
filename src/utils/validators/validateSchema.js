const validateSchema = (schema) => async (objectValues) => {
  try {
    console.log(objectValues);
    await schema.validateAsync(objectValues);
    return;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

module.exports = validateSchema;
