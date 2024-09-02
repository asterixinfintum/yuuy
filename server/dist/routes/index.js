"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _deploy = _interopRequireDefault(require("./deploy"));
var _compile = _interopRequireDefault(require("./compile"));
var _auth = _interopRequireDefault(require("./auth"));
var _verify = _interopRequireDefault(require("./verify"));
var _contracts = _interopRequireDefault(require("./contracts"));
var _savedetails = _interopRequireDefault(require("./savedetails"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var _default = exports["default"] = {
  deployRoute: _deploy["default"],
  compileRoute: _compile["default"],
  authRoute: _auth["default"],
  verifyRoute: _verify["default"],
  contractRoute: _contracts["default"],
  saveDetailRoute: _savedetails["default"]
};