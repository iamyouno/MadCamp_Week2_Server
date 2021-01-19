// app.js

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var multer = require('multer');


var uri = "mongodb://localhost:27017/test";
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});

const connection = mongoose.connection;

connection.once("open", function(){
    console.log("Mongo success");
})

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

var contact = require('./models/contact');
var taxi = require('./models/taxi');
var Image = require('./models/image');

// [CONFIGURE ROUTER]
var router_contact = require('./routes/routesContact')(app, contact)
var router_taxi = require('./routes/routesTaxi')(app, taxi)
var image_router = require('./routes/imageRouter')(app, Image);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

