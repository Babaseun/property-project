'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./src/routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));

app.use(_express2.default.static(_path2.default.join(__dirname, 'public/UI')));
app.use('/api/v1/', _routes2.default);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log('Listening on port ' + PORT + '.......');
});
// "dev-start": "nodemon --exec babel-node ./src/app.js",
//     "start": "npm run build",
//     "build": "npm run babel-build && node ./client/app.js",
//     "babel-build": "babel -d ./client ./src -s"
//   },