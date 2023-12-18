var express = require('express');
var router = express.Router();
const User = require('../models/userregister');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/index.html', function (req, res) {
  res.render('index');
});

router.get('/index', function (req, res) {
  res.render('index');
});

// input
router.get('/input/:path?', function (req, res) {

  const path = req.params.path || 'index';
  res.render('input/' + path.replace('.html', ''));
});

// Learning
router.get('/Learning/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Learning/' + path.replace('.html', ''));
});

//overview
router.get('/overview/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('overview/' + path.replace('.html', ''));
});

//pages
router.get('/Pages/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Pages/' + path.replace('.html', ''));
});

//statistics

router.get('/Statistics/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Statistics/' + path.replace('.html', ''));
});

//services
router.get('/Services/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Services/' + path.replace('.html', ''));
});

//table
router.get('/table/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('table/' + path.replace('.html', ''));
});

//teacher
router.get("/teacher/:path?", function (req, res) {
  const path = req.params.path || "index";
  res.render("teacher/" + path.replace(".html", ""));
});

// Wollkart
router.get('/Woolkart/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Woolkart/' + path.replace('.html', ''));
});

router.get('/warehouse/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('warehouse/' + path.replace('.html', ''));
});


router.get('/app-notifications.html', function (req, res) {
  res.render('app-notifications');
});
router.get('/app-profile.html', function (req, res) {
  res.render('app-profile');
});



//user register and login
//register

router.post('/pages/app-register', async (req, res) => {
  try {
    // Create a new user based on the form data
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      dateOfBirth: req.body.dateOfBirth,
      role: req.body.role
    });
    if (req.body.password !== req.body.passwordAgain) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.redirect('/pages/app-login.html');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//login

router.post('/pages/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user based on the email address in your database
    const user = await User.findOne({ email }); // Assuming you're using Mongoose or a similar ORM

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = password == user.password; // Assuming bcrypt is used for hashing passwords

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    // get jwt token
    const token = jwt.sign({ id: user._id, role: user.role }, "secretSIH");
    console.log(token);
    user.password = "";
    return res.json({
      message: 'success',
      token,
      user

    })

  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
});

router.post("/pages/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error){
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
