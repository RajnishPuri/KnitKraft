var express = require("express");
var router = express.Router();
const Meeting = require("../models/Meeting");
const Transport = require("../models/Transport");
const mongoose = require("mongoose");
const { json } = require("express");
const Warehouse = require("../models/Warehouse");
const Service = require("../models/Service");
const User = require("../models/userregister");

router.get("/", function (req, res) {
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
  meeting
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Meeting Booked Successfully",
        meeting: meeting,
        status: "success",
      });
    })
    .catch((err) => {
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
  Meeting.findOneAndUpdate(
    { _id: id },
    { $set: { status: req.body.status, response: meetResponse } }
  )
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Meeting Updated Successfully",
        meeting: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        status: "failed",
      });
    });
});

router.post("/deleteMeet", function (req, res) {
  var id = req.body.id;
  Meeting.findOneAndDelete({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Meeting Deleted Successfully",
        meeting: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        status: "failed",
      });
    });
});

router.get("/getMeetings", function (req, res) {
  Meeting.find()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Meetings Fetched Successfully",
        meetings: result,
        status: "success",
      });
    })
    .catch((err) => {
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
  transport
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Transport Booked Successfully",
        transport: transport,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        status: "failed",
      });
    });
});

router.get("/getTransports", function (req, res) {
  Transport.find({})
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Transport Fetched Successfully",
        transport: result,
        status: "success",
      });
    })
    .catch((err) => {
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
    const result = await Transport.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          progress: {
            initiated: progress.initiated,
            shipped: progress.shipped,
            outForDelivery: progress.outForDelivery,
            delivered: progress.delivered,
          },
        },
      }
    );

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
  Transport.findOneAndDelete({ _id: id })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Transport Deleted Successfully",
        transport: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        status: "failed",
      });
    });
});

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
    shelf: "",
  });
  warehouse
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Warehouse Booked Successfully",
        warehouse: warehouse,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        status: "failed",
      });
    });
});

router.get("/getWarehousesBooking", function (req, res) {
  Warehouse.find({})
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Warehouse Fetched Successfully",
        warehouse: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

router.post("/updateWarehouseBookingStatus", function (req, res) {
  var id = req.body.id;
  Warehouse.findOneAndUpdate({ _id: id }, { $set: { status: req.body.status } })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Warehouse Updated Successfully",
        warehouse: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

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
    shelf: req.body.shelf,
  };
  Warehouse.findOneAndUpdate({ _id: id }, { $set: data })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Warehouse Updated Successfully",
        warehouse: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

// now for service
router.post("/bookService", function (req, res) {
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    serviceType: req.body.serviceType,
    farmerId: req.body.farmerId,
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    serviceDate: req.body.serviceDate,
    message: req.body.message,
    batchNo: req.body.batchId,
    status: "pending",
  });
  // create a batch for the farmer if it doesn't exist in the database of farmer
  

  //else add the service to the batch
  service
    .save()
    .then((result) => {
      try {
        User.findOne({ _id: req.body.farmerId }).then((result) => {
          if (result) {
            var batch = result.batches.find(
              (card) => card.name.toString() === req.body.batchNo
            );
            if (!batch) {
              var batch = {
                name: req.body.batchNo,
                progress: 0,
                lastUpdatedBy: "service",
              };
              User.findOneAndUpdate(
                { _id: req.body.farmerId },
                { $push: { batches: batch } }
              ).then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "batch Added Successfully",
                  user: result,
                  status: "success",
                });
    
              });
            }else{
              res.status(201).json({
                message: "batch already exists",
                user: result,
                status: "success",
              });
            }
    
          }else{
            res.status(500).json({ message: "Farmer not found" });
          }
        });
      } catch (err) {
        console.log("error in creating batch for farmer");
        console.log(err);
        res.status(500).json({ message: "Farmer not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

router.get("/getServiceBookings", function (req, res) {
  // return all the service bookings in sorted order of date
  Service.find({})
    .sort({ createdAt: 1 })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Service Fetched Successfully",
        service: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

router.post("/updateServiceStatus", function (req, res) {
  var id = req.body.id;
  Service.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        status: req.body.status,
        response: req.body.response ? req.body.response : "",
      },
    }
  )
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Service Updated Successfully",
        service: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

router.post("/updateProgress", function (req, res) {
  var id = req.body.id;
  User.findOneAndUpdate(
    { _id: id },
    { $set: { progress: parseInt(req.body.progress), lastUpdated: Date.now() } }
  )
    .then((result) => {
      console.log(result);
      res
        .status(201)
        .cookie("progress", req.body.progress)
        .cookie("lastUpdated", Date.now())
        .json({
          message: "Progress Updated Successfully",
          user: result,
          status: "success",
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

router.post("/:userId/addBatch", function (req, res) {
  var id = req.params.userId;
  var batch = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    date: Date.now(),
  };
  User.findOneAndUpdate({ _id: id }, { $push: { batchs: batch } })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "batch Added Successfully",
        user: result,
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        status: "failed",
      });
    });
});

router.post("/:userId/:BatchId/editProgress", async (req, res) => {
  const user = User.findById(req.params.userId);
  var batch = user.batches.find(
    (card) => card._id.toString() === req.params.BatchId
  );
  Object.assign(batch, {
    progress: req.body.progress,
    lastUpdatedBy: req.body.lastUpdatedBy,
  });
  await user.save();
  res.json({
    status: "success",
  });
});

router.post("/:userId/:BatchId/generateCertificate", async (req, res) => {
  const user = User.findById(req.params.userId);
  var batch = user.batches.find(
    (card) => card._id.toString() === req.params.BatchId
  );
  Object.assign(batch, req.body);
  await user.save();
  res.json({
    status: "success",
  });
});
router.post("/getUserById", (req, res) => {
  User.findById(req.body.id).then((result) => {
    res.json({
      user: result,
    });
  });
});

console.log("https://knitkraft.onrender.com");
module.exports = router;
