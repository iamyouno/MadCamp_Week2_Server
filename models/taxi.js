var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taxiSchema = new Schema({
    location: String,
    when: String,
    person: Number,
    arrayUser : { type : Array , "default" : [] }
});

module.exports = mongoose.model('taxi', taxiSchema);
//book을 모듈화 하였다