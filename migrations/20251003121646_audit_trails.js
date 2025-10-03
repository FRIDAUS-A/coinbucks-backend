/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('audit_trails', (table) => {
    table.string('auditId').primary()
    table.string('action')
    table.string('details')
    table.string('ipAddress')
    table.timestamp('operationTime').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
