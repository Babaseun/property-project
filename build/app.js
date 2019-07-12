'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./routes/routes');

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
// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'Not Foundh' });
// });
app.use(_express2.default.static('../public/UI'));
app.use('/api/v1/', _routes2.default);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log('listening on port ' + PORT + '.........');
});
//# sourceMappingURL=app.js.map