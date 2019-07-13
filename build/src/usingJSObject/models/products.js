'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function () {
  function Product() {
    _classCallCheck(this, Product);

    this.products = [];
  }

  _createClass(Product, [{
    key: 'create',
    value: function create(data) {
      var newProduct = {
        id: _uuid2.default.v4(),
        picture: data.picture || ' ',
        numberOfRooms: data.numberOfRooms || ' ',
        location: data.location || ' ',
        createdAt: (0, _moment2.default)().format('LLLL'),
        modifiedAt: (0, _moment2.default)().format('LLLL')
      };
      this.products.push(newProduct);
      return newProduct;
    }
  }, {
    key: 'findOne',
    value: function findOne(id) {
      return this.products.find(function (product) {
        return product.id === id;
      });
    }
  }, {
    key: 'findAll',
    value: function findAll() {
      return this.products;
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      var product = this.findOne(id);
      var index = this.products.indexOf(product);
      this.products[index].picture = data.picture || product.picture;
      this.products[index].numberOfRooms = data.numberOfRooms || product.numberOfRooms;
      this.products[index].location = data.location || product.location;
      this.products[index].modifiedAt = (0, _moment2.default)().format('LLLL');

      return this.products[index];
    }
  }, {
    key: 'delete',
    value: function _delete(id) {
      var product = this.findOne(id);
      var index = this.products.indexOf(product);
      this.products.splice(index, 1);
      return {};
    }
  }]);

  return Product;
}();

exports.default = new Product();
//# sourceMappingURL=products.js.map