var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var i18n = require("i18n-express");
 
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var api = require("./routes/api");
var db = require("./src/db/db");


 
var app = express();
 
global.currentLanguage = "eng";
 
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
 
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
 
app.use(
  i18n({
    translationsPath: path.join(__dirname, "lang"), 
    siteLangs: ["eng", "hin"],
    textsVarName: "translation",
    browserEnable: true,
    defaultLang: "eng"
  })
);
 
app.use(function (req, res, next) {
  if (req.query.clang) {
    global.currentLanguage = req.query.clang;
  }
  next();
});
 
app.use("/", indexRouter);
app.use("/<lang>/users", usersRouter);
app.use("/api", api);
 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
 
module.exports = app;
 