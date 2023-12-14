var express = require('express');
var router = express.Router();
const User = require('./../src/models/userregister');
const Userlogin = require('./../src/models/logingpage');

require('./../src/db/cons');



/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/index.html', function (req, res) {
  res.render('index');
});

router.get('/Woolkart', function (req, res) {
  res.render('Woolkart/index');
});
router.get('/Woolkart/:path', function (req, res) {
  res.render('Woolkart/' + req.params.path.replace('.html', ''));
});

router.get('/Learning', function (req, res) {
  res.render('Learning/index');
});
router.get('/Learning/:path', function (req, res) {
  res.render('Learning/' + req.params.path.replace('.html', ''));
});

router.get('/Services', function (req, res) {
  res.render('Services/index');
});


router.get('/Services/:path', function (req, res) {
  res.render('Services/' + req.params.path.replace('.html', ''));
});

//Statistics
router.get('/Statistics', function (req, res) {
  res.render('Statistics/index');
});

router.get('/pages/:path', function (req, res) {
  res.render('pages/' + req.params.path.replace('.html', ''));
});


//add video
router.get('/overview/profile.html', function (req, res) {
  res.render('overview/profile');
});
router.get('/app-notifications.html', function (req, res) {
  res.render('app-notifications');
});
router.get('/app-profile.html', function (req, res) {
  res.render('app-profile');
});

router.post('/pages/app-register', async (req, res) => {
  try {
    // Create a new user based on the form data
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      passwordAgain: req.body.passwordAgain,
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      dateOfBirth: req.body.dateOfBirth,
      role: req.body.role
    });
    if (password !== passwordAgain) {
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
    const isPasswordValid = password==user.password; // Assuming bcrypt is used for hashing passwords
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // If email and password are correct, you can proceed with login logic (e.g., creating a session, generating JWT, etc.)
    
    res.status(200).json({ message: 'Login successful!' });
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
