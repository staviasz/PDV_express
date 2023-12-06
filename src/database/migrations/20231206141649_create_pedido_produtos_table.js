/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable("pedido_produtos");

  if (!tableExists) {
    return knex.schema.createTable("pedido_produtos", (table) => {
      table.increments("id").primary();
      table.integer("pedido_id").references("pedidos.id").notNullable();
      table.integer("produto_id").references("produtos.id").notNullable();
      table.integer("quantidade_produto").notNullable();
      table.integer("valor_produto").notNullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("pedido_produtos");
};
