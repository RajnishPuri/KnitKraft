var express = require('express');
var router = express.Router();
const Meeting = require('../models/Meeting');
const Transport = require('../models/Transport');
const mongoose = require('mongoose');
const { json } = require('express');


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
console.log("Api Is Working");
module.exports = router;