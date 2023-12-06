/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExits = await knex.schema.hasTable("pedidos");

  if (!tableExits) {
    return knex.schema.createTable("pedidos", (table) => {
      table.increments("id").primary();
      table.integer("cliente_id").references("clientes.id").notNullable();
      table.string("observacao", 255);
      table.integer("valor_total").notNullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("pedidos");
};
