var express = require('express');
var router = express.Router();
const Meeting = require('../models/Meeting');
const Transport = require('../models/Transport');
const mongoose = require('mongoose');
const { json } = require('express');
const Warehouse = require('../models/Warehouse');


router.get('/', function (req, res) {
    res.send("Api Is Working");
});

router.post("/bookMeet", function (req, res) {
    const meeting = new Meeting({
        _id: new mongoose.Types.ObjectId(),
        farmerId: req.body.farmerId,
        name: req.body.name,
        topic: req.body.topic,
        date: req.body.date,
        time: req.body.time,
        message: req.body.message,
        status: "pending",
    });
    meeting.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Meeting Booked Successfully",
            meeting: meeting,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });
});

router.post("/updateMeet", function (req, res) {
    var id = req.body.id;
    var meetResponse = req.body.meetResponse;
    Meeting.findOneAndUpdate({ _id: id }, { $set: {status: req.body.status, response: meetResponse } }).then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Meeting Updated Successfully",
            meeting: result,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });

});

router.post("/deleteMeet", function (req, res) {
    var id = req.body.id;
    Meeting.findOneAndDelete({ _id: id }).then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Meeting Deleted Successfully",
            meeting: result,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });

});

router.get("/getMeetings", function (req, res) {
    Meeting.find().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Meetings Fetched Successfully",
            meetings: result,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });
});


router.post("/bookTransport", function (req, res) {
    const transport = new Transport({
        _id: new mongoose.Types.ObjectId(),
        farmerId: req.body.farmerId,
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        address: req.body.address,
        quantity: req.body.quantity,
        sourceAddress: req.body.sourceAddress,
        destAddress: req.body.destAddress,
        vehicleType: req.body.vehicleType,
        progress: {
            initiated: false,
            shipped: false,
            outForDelivery: false,
            delivered: false,
        },
    });
    transport.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Transport Booked Successfully",
            transport: transport,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });
});

router.get("/getTransports", function (req, res) {
    Transport.find({ }).then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Transport Fetched Successfully",
            transport: result,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });
});

router.post("/updateTransportProgress", async function (req, res) {
    try {
        const id = req.body.id;
        console.log(id, "id");
        const progress = JSON.parse(req.body.progress);
        const result = await Transport.findOneAndUpdate({ _id: id }, { $set: { progress: {
            initiated: progress.initiated,
            shipped: progress.shipped,
            outForDelivery: progress.outForDelivery,
            delivered: progress.delivered,
        } } });

        console.log(result);

        res.status(201).json({
            message: "Transport Updated Successfully",
            transport: result,
            status: "success",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
            status: "failed",
        });
    }
});


router.post("/deleteTransport", function (req, res) {
    var id = req.body.id;
    Transport.findOneAndDelete({ _id: id }).then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Transport Deleted Successfully",
            transport: result,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });

}
);

// WAREHOUSE API

router.post("/bookWarehouse", function (req, res) {
    const warehouse = new Warehouse({
        _id: new mongoose.Types.ObjectId(),
        farmerId: req.body.farmerId,
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        quantity: req.body.quantity,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        woolType: req.body.woolType,
        status: "pending",
        message: "",
        shelf: ""
    });
    warehouse.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Warehouse Booked Successfully",
            warehouse: warehouse,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err,
            status: "failed",
        });
    });
}
);

router.get("/getWarehousesBooking", function (req, res) {
    Warehouse.find({}).then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Warehouse Fetched Successfully",
            warehouse: result,
            status: "success"
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: err,
            status: "failed",
        });
    });
});

router.post("/updateWarehouseBookingStatus", function (req, res) {
    var id = req.body.id;
    Warehouse.findOneAndUpdate({ _id: id }, { $set: { status: req.body.status } }).then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Warehouse Updated Successfully",
            warehouse: result,
            status: "success",
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: err,
            status: "failed",
        });
    });
}
);

router.post("/updateWarehouseBooking", function (req, res) {
    var id = req.body._id;
    var data = { 
        name: req.body.name,
        mobile: req.body.mobile,
        email: req.body.email,
        address: req.body.address,
        quantity: req.body.quantity,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        woolType: req.body.woolType,
        status: req.body.status,
        message: req.body.message,
        shelf: req.body.shelf
     };
    //  return res.json(data);
    Warehouse.findOneAndUpdate({ _id: id }, { $set: data }).then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Warehouse Updated Successfully",
            warehouse: result,
            status: "success",
        });
    }
    ).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: err,
            status: "failed",
        });
    });
});





console.log("http://localhost:4000");
module.exports = router;