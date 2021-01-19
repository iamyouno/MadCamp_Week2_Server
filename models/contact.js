var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: String,
    number: String,
    facebookId: String,
});

module.exports = mongoose.model('contact', contactSchema);
//contact을 모듈화 하였다