const mongoose = require('mongoose')

const productadSchema = new mongoose.Schema({
  image:{
    type:String,
    trim: true,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Productad', productadSchema)