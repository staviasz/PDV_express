/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const colunmExists = await knex.schema.hasColumn(
    "produtos",
    "produto_imagem"
  );

  if (!colunmExists) {
    return knex.schema.alterTable("produtos", (table) => {
      table.text("produto_imagem");
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const columnExists = await knex.schema.hasColumn(
    "produtos",
    "produto_imagem"
  );

  if (columnExists) {
    return knex.schema.alterTable("produtos", (table) => {
      table.dropColumn("produto_imagem");
    });
  }
};
