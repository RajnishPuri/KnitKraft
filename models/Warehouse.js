const mongoose = require('mongoose');
const schema = mongoose.Schema;

/*
    farmerId: 43689564389
name: 
mobile: 
email: 
address: 
quantity: 
fromDate: 
toDate: 
*/

const TransportSchema = new schema({
    farmerId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String, required: true },
    quantity: { type: String, required: true },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    quality: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
});
