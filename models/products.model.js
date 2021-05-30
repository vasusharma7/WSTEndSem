const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Products = mongoose.model('products', new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    desc:{type:String,required:false}
}, { strict: false }));

module.exports = Products;
