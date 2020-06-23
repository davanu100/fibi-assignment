const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ImageSchema = new Schema({

    url : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    }
});

ImageSchema.index({name:'text'});
module.exports = mongoose.model('Image',ImageSchema);