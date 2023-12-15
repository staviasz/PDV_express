const schemaProduct = require("../schemas/schemaProduct");
const validateSchema = require("./validateSchema");

const validateProduct = async (
  database,
  schemaValues,
  categoryId,
  productId = null
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

const validateDelProduct = async (database, productId) => {
  const orderedProduct = await database("pedido_produtos")
    .where({ produto_id: productId })
    .first();
  if (orderedProduct) {
    return "O produto está vinculado a um pedido e não pode ser excluído.";
  }

  const product = await database("produtos").where({ id: productId }).first();
  if (!product) {
    return "Produto não encontrado.";
  }

  return product;
};

module.exports = { validateProduct, validateDelProduct };
