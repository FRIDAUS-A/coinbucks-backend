const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class AuditTrail extends Model {
  static get tableName() {
    return 'audit_trails';
  }
}


module.exports = { AuditTrail }