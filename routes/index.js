var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/index.html', function (req, res) {
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
router.render('/Woolkart/:path?', function (req, res) {
  const path = req.params.path || 'index';
  res.render('Woolkart/' + path.replace('.html', ''));
});

router.get('/app-notifications.html', function (req, res) {
  res.render('app-notifications');
});
router.get('/app-profile.html', function (req, res) {
  res.render('app-profile');
});



module.exports = router;
