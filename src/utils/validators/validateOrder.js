const schemaOrder = require("../schemas/schemaOrder");
const validateSchema = require("./validateSchema");

const validateOrder = async (database, { customer_id, order_products }) => {
  const errorSchema = await validateSchema(schemaOrder)({
    customer_id,
    order_products,
  });
  if (errorSchema) {
    return errorSchema;
  }

  const clienteExist = await database("clientes")
    .where({ id: customer_id })
    .first();
  if (!clienteExist) {
    return "Cliente não encontrado";
  }

  const uniqueProductIds = new Set();
  for (const { produto_id } of order_products) {
    if (uniqueProductIds.has(produto_id)) {
      return `Produto com id ${produto_id} está duplicado no pedido`;
    }
    uniqueProductIds.add(produto_id);
  }

  for (const { produto_id, quantidade_produto } of order_products) {
    const produtoExist = await database("produtos")
      .where({ id: Number(produto_id) })
      .first();
    if (!produtoExist) {
      return `Produto com id ${produto_id} não encontrado`;
    }
    if (produtoExist.quantidade_estoque < quantidade_produto) {
      return `Quantidade insuficiente em estoque para o produto com id ${produto_id} / ${produtoExist.descricao}`;
    }
  }

  return;
};

module.exports = validateOrder;
