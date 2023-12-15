const mongoose = require('mongoose');
const schema = mongoose.Schema;

const WarehouseSchema = new schema({
    farmerId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    woolType: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
});


module.exports = mongoose.model('Warehouse', WarehouseSchema);