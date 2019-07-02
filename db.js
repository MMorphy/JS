let mysql = require('mysql');
let util = require('util');
let config = require('./config');

var pool = mysql.createPool(config.pool);
pool.query = util.promisify(pool.query);

module.exports = pool;