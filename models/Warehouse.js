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
    createdAt: { type: Date, default: Date.now },
    status: { type: String, required: true, default: "pending" },
    message: { type: String, default: "" },
    shelf: { type: String, default: "" },
});



module.exports = mongoose.model('Warehouse', WarehouseSchema);