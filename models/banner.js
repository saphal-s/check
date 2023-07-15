const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema;

const bannerSchema = new mongoose.Schema({
  image:{
    type:String,
    trim: true,
    required: true,
  }
 
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema)