const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const cuponSchema = new mongoose.Schema({
   name:{
       type:String,
       trim:true,
       unique:true,
       uppercase:true,
       required:'Name is required',
       minlength:[4,'Too short'],
       maxlength:[12,'Too long']
   },
   expiry:{
       type:Date,
       required:true,
   },
   discount:{
       type:Number,
       required:true,
   }
},{timestamps:true});

module.exports = mongoose.model("Coupon",cuponSchema)