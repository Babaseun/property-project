'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('../usingDB/controllers/products');

var _products2 = _interopRequireDefault(_products);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('babel-polyfill');

var _Users = require('../usingDB/controllers/Users');

var _Users2 = _interopRequireDefault(_Users);

var _Auth = require('../usingDB/middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

var _expressRateLimit = require('express-rate-limit');

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import ProductUsingJSObject from '../usingJSObject/controllers/products';
var apiLimiter = (0, _expressRateLimit2.default)({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1
});
_dotenv2.default.config();
var router = _express2.default.Router();

// const Product =
//   process.env.TYPE === 'db' ? ProductUsingDB : ProductUsingJSObject;

router.post('/products', _Auth2.default.verifyToken, apiLimiter, _products2.default.create);
router.get('/products', _Auth2.default.verifyToken, _products2.default.getAll);
router.get('/products/:id', _Auth2.default.verifyToken, _products2.default.getOne);
router.put('/products/:id', _Auth2.default.verifyToken, _products2.default.update);
router.delete('/products/:id', _Auth2.default.verifyToken, _products2.default.delete);
router.post('/users', _Users2.default.create);
router.post('/users/login', _Users2.default.login);

router.delete('/users/me', _Auth2.default.verifyToken, _Users2.default.delete);

module.exports = router;
//# sourceMappingURL=routes.js.map