const multer = require('multer');
var express = require('express');
var app = express();
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const image = require('../models/image');



module.exports = function(app, Image)
{
    var form = "<!DOCTYPE HTML><html><body>" +
        "<form method='post' action='/upload' enctype='multipart/form-data'>" +
        "<input type='file' name='upload'/>" +
        "<input type='submit' /></form>" +
        "</body></html>";

    app.get('/', function (req, res){
        res.writeHead(200, {'Content-Type': 'text/html' });
        res.end(form);
    });

    var storage = multer.diskStorage({
        destination: './uploads/',
        filename: function(req, file, cb) {
            return crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) {
                return cb(err);
            }
            return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
            });
        }
    });

    app.post("/upload", multer({storage: storage}).single('upload'), function(req, res) {
        var image = new Image();
        console.log(req.file);
        console.log(req.body);
        image.name = req.file.originalname;
        image.addr = req.file.path;
        image.save(function(err) {
            if (err) {
                console.err(err);
                res.json(err);
                return;
            }
            res.redirect("/uploads/" + req.file.filename);
            console.log(req.file.filename);
            return res.status(200).end();
        });
    });
      
    app.get('/uploads/:upload', function (req, res){
        file = req.params.upload;
        console.log(req.params.upload);
        var img = fs.readFileSync(__dirname + "/../uploads/" + file);
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
    });

    app.get('/api/images', (req, res) => {
        Image.find({}, (err, images) => {
            if (err) return res.status(500).send({error: 'database failure'});
            console.log(images);
            res.json(images);
        })
    });

    app.get('/api/images/:name', (req, res) => {
        console.log(req.params.name);
        Image.findOne({name: req.params.name}, function (err, image) {
            console.log(image);
            if (err) return res.status(500).json({error: err});
            if (!image) return res.status(404).json({error: 'image not found'});
            const img = fs.readFileSync(__dirname + '/../' + image.addr);
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(img, 'binary');
            // res.json(image);
        })
    });
}