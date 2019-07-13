'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _index = require('../db/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Product = {
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var text, values, _ref2, rows;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              text = 'INSERT INTO products(id ,\n            picture ,\n            numberOfRooms ,\n            location,\n            price,\n            owner_id,\n            isAdmin,\n            created_date,\n            modified_date)VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *';
              values = [(0, _v2.default)(), req.body.picture, req.body.numberOfRooms, req.body.location, req.body.price, req.user.id, false, (0, _moment2.default)(new Date()), (0, _moment2.default)(new Date())];
              _context.prev = 2;
              _context.next = 5;
              return _index2.default.query(text, values);

            case 5:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              return _context.abrupt('return', res.status(201).send(rows[0]));

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](2);
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 13:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 10]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),
  getAll: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var findAllQuery, _ref4, rows, rowCount;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              findAllQuery = 'SELECT * FROM products where owner_id = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _index2.default.query(findAllQuery, [req.user.id]);

            case 4:
              _ref4 = _context2.sent;
              rows = _ref4.rows;
              rowCount = _ref4.rowCount;
              return _context2.abrupt('return', res.status(200).send({ rows: rows, rowCount: rowCount }));

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', res.status(400).send(_context2.t0));

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 10]]);
    }));

    function getAll(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return getAll;
  }(),
  getOne: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var text, _ref6, rows;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              text = 'SELECT * FROM products WHERE id = $1 AND owner_id = $2';
              _context3.prev = 1;
              _context3.next = 4;
              return _index2.default.query(text, [req.params.id, req.user.id]);

            case 4:
              _ref6 = _context3.sent;
              rows = _ref6.rows;

              if (rows[0]) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt('return', res.status(404).send({ message: 'product not found' }));

            case 8:
              return _context3.abrupt('return', res.status(200).send(rows[0]));

            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3['catch'](1);
              return _context3.abrupt('return', res.status(400).send(_context3.t0));

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 11]]);
    }));

    function getOne(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return getOne;
  }(),
  update: function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var findOneQuery, updateOneQuery, _ref8, rows, values, response;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              findOneQuery = 'SELECT * FROM products WHERE id=$1 AND owner_id = $2';
              updateOneQuery = 'UPDATE products\n      SET picture=$1,numberOfRooms=$2,location=$3,price=$4, modified_date=$5,\n      WHERE id=$6 AND owner_id = $7 returning *';
              _context4.prev = 2;
              _context4.next = 5;
              return _index2.default.query(findOneQuery, [req.params.id, req.user.id]);

            case 5:
              _ref8 = _context4.sent;
              rows = _ref8.rows;

              if (rows[0]) {
                _context4.next = 9;
                break;
              }

              return _context4.abrupt('return', res.status(404).send({ message: 'product not found' }));

            case 9:
              values = [req.body.picture || rows[0].picture, req.body.numberOfRooms || rows[0].numberOfRooms, req.body.location || rows[0].location, req.body.picture || rows[0].picture, (0, _moment2.default)(new Date()), req.params.id, req.user.id];
              _context4.next = 12;
              return _index2.default.query(updateOneQuery, values);

            case 12:
              response = _context4.sent;
              return _context4.abrupt('return', res.status(200).send(response.rows[0]));

            case 16:
              _context4.prev = 16;
              _context4.t0 = _context4['catch'](2);
              return _context4.abrupt('return', res.status(400).send(_context4.t0));

            case 19:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 16]]);
    }));

    function update(_x7, _x8) {
      return _ref7.apply(this, arguments);
    }

    return update;
  }(),
  delete: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
      var deleteQuery, _ref10, rows;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              deleteQuery = 'DELETE FROM products WHERE id=$1 AND owner_id = $2 returning *';
              _context5.prev = 1;
              _context5.next = 4;
              return _index2.default.query(deleteQuery, [req.params.id, req.user.id]);

            case 4:
              _ref10 = _context5.sent;
              rows = _ref10.rows;

              if (rows[0]) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt('return', res.status(404).send({ message: 'product not found' }));

            case 8:
              return _context5.abrupt('return', res.status(200).send({ message: 'deleted' }));

            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5['catch'](1);
              return _context5.abrupt('return', res.status(400).send(_context5.t0));

            case 14:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 11]]);
    }));

    function _delete(_x9, _x10) {
      return _ref9.apply(this, arguments);
    }

    return _delete;
  }()
};
exports.default = Product;
//# sourceMappingURL=products.js.map