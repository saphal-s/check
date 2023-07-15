const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    size: {
      type: String,
      trim: true,
      required: true,
      maxlength: 5,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    ratings: [
      {
        star: Number,
        postedBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
