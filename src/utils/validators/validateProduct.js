const schemaProduct = require("../schemas/schemaProduct");
const validateSchema = require("./validateSchema");

const validateProduct = async (
  database,
  schemaValues,
  categoryId,
  productId = null,
) => {
  const errorSchema = await validateSchema(schemaProduct)(schemaValues);
  if (errorSchema) return errorSchema;

  const queries = [
    database("categorias").where({ id: categoryId }).first(),
    database("produtos").where({ id: productId }).first(),
  ];
  const [categoryExist, productExist] = await Promise.all(queries);
  if (!categoryExist) {
    return "A categoria não encontrada";
  }
  if (productId && !productExist) {
    return "Produto não cadastrado";
  }
  return;
};

module.exports = validateProduct;
