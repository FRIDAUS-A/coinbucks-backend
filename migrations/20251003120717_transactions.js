/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.string('transactionId').primary().notNullable()
    table.float('amountInCrypto').notNullable()
    table.float('amountInNaira').notNullable()
    table.enu('cryptoType', ['BTC', 'ETH', 'USDT']).notNullable()
    table.float('conversionRate').notNullable()
    table.string('recipientBank').notNullable()
    table.timestamp('transactionAt').defaultTo(knex.fn.now()).notNullable()
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
