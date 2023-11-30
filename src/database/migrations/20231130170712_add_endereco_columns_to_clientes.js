/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.up = function (knex) {
  return knex.schema.table('clientes', (table) => {
    table.string('cep', 8);
    table.string('rua', 255);
    table.string('numero', 20);
    table.string('bairro', 255);
    table.string('cidade', 255);
    table.string('estado', 255);
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
exports.down = function (knex) {
  return knex.schema.table('clientes', (table) => {
    table.dropColumn('cep');
    table.dropColumn('rua');
    table.dropColumn('numero');
    table.dropColumn('bairro');
    table.dropColumn('cidade');
    table.dropColumn('estado');
  });
};
