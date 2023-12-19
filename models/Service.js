const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceType: {
        type: String,
        required: true,
    },
    farmerId: {
        type: String,
        required: false,
        default: '',
    },
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    serviceDate: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: false,
        default: '',
    },
    status: {
        type: String,
        default: 'Pending',
    },
    response: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

module.exports = mongoose.model('Service', serviceSchema);