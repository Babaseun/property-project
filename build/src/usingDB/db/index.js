'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var pool = new _pg.Pool({
  user: process.env.USER,
  database: process.env.DATABASE,
  port: 5432,
  password: process.env.DB_PASSWORD
});
exports.default = {
  query: function query(text, params) {
    return new Promise(function (resolve, reject) {
      pool.query(text, params).then(function (res) {
        resolve(res);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
};
//# sourceMappingURL=index.js.map