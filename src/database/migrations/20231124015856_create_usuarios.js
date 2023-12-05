/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const tableExists = await knex.schema.hasTable("usuarios");

  if (!tableExists) {
    return knex.schema.createTable("usuarios", (table) => {
      table.increments("id").primary();
      table.string("nome").notNullable();
      table.string("email").unique().notNullable();
      table.string("senha").notNullable();
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("usuarios");
};
