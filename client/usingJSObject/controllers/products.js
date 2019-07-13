'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _products = require('../models/products');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Product = {
  create: function create(req, res) {
    var _req$body = req.body,
        picture = _req$body.picture,
        numberOfRooms = _req$body.numberOfRooms,
        location = _req$body.location;

    if (!picture && !numberOfRooms && !location) {
      return res.status(400).send({ message: 'All fields are required' });
    }
    var product = _products2.default.create(req.body);
    return res.status(201).send(product);
  },
  getAll: function getAll(req, res) {
    var products = _products2.default.findAll();
    return res.status(200).send(products);
  },
  getOne: function getOne(req, res) {
    var product = _products2.default.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    return res.status(200).send(product);
  },
  update: function update(req, res) {
    var product = _products2.default.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    var updatedProduct = _products2.default.update(req.params.id, req.body);
    return res.status(200).send(updatedProduct);
  },
  delete: function _delete(req, res) {
    var product = _products2.default.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    var ref = _products2.default.delete(req.params.id);
    return res.status(204).send(ref);
  }
};
exports.default = Product;
//# sourceMappingURL=products.js.map