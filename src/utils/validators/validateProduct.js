const schemaProduct = require('../schemas/schemaProduct');
const validateSchema = require('./validateSchema');

const validateProduct = async (
  database,
  schemaValues,
  categoryId,
  productId = null,
) => {
  const errorSchema = await validateSchema(schemaProduct)(schemaValues);
  if (errorSchema) return errorSchema;

  const categoryExist = await database('categorias')
    .where('id', categoryId)
    .first();
  if (!categoryExist) {
    return 'A categoria não encontrada';
  }
  if (productId) {
    // vai ser usado na proxima rota
    console.log(productId);
  }
  return;
};

module.exports = validateProduct;
