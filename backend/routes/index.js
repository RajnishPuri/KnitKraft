var express = require('express');
var router = express.Router();

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
module.exports = router;
