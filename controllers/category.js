const Category = require("../models/category");
const Product = require("../models/product");
var slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, title } = req.body;
    const category = await new Category({
      name,
      title,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => {
  const category = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(category);
};

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();
  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, title } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), title },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Category update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Category delete failed");
  }
};
