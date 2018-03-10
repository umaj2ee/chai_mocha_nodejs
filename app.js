var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose')
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//db setup
mongoose.connect('mongodb://localhost/piratedb');

//define the schema
let translateSchema=new mongoose.Schema({
    phrase:String,
    translation:String
});

//create a model
let PirateTrans=mongoose.model('priatetranslations',translateSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//the main page
app.get('/', (req, res) => {
  res.render('index',{title: 'Shout/Translate'});
});

//the shout JSON endpoint
app.get('/shout', (req, res) => {
    let input=req.query.text;
    //res.send('input: "' + input + '"');
res.json({ result : input.toUpperCase()});
});

//the translate endpoint
app.get('/translate', (req, res) => {
    let text=req.query.text;
//PirateTrans.findOne({phrase:input},(err,rec) => {
 PirateTrans.find({ },(err,all_records) => {
  if (err){
    console.log(err);
    res.json({result:null});
  }
  else if(all_records == []){
    res.json({result :null});
}
else{
    console.log(all_records);
    all_records.forEach((rec) => {
    text = text.replace(new RegExp(rec.phrase,'g'),rec.translation);
    });
    //res.json( rec );
    res.json({result: text});
}
 });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
