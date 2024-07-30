"use strict";

var mongoose = require('mongoose');
var contractItmSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    trim: true
  },
  initialEncrkeys: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  symbol: {
    type: String,
    required: true,
    trim: true
  }
});
var ContractItem = mongoose.model('Contact', contractItmSchema);
module.exports = ContractItem;