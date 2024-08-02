const mongoose = require('mongoose')

const contractItmSchema = new mongoose.Schema({
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
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const ContractItem = mongoose.model('Contact', contractItmSchema);

module.exports = ContractItem;