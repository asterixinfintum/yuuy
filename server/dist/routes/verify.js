"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _contracts = _interopRequireDefault(require("../models/contracts"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
require('dotenv').config();
var _require = require('hardhat'),
  run = _require.run;
var verifyRoute = (0, _express["default"])();
var _default = exports["default"] = verifyRoute;