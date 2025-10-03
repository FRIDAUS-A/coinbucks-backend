const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Transaction extends Model {
  static get tableName() {
    return 'transactions';
  }
}


module.exports = { 
    Transaction 
};