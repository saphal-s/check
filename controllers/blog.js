const Blog = require("../models/Blog");
const User = require("../models/user");
var slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    const { title, shortdescription, description } = req.body;
    const blog = await new Blog({
      title,
      shortdescription,
      description,
      slug: slugify(title),
    });
    if (req.file) {
      blog.image = req.file.path;
    }
    blog.save();
    res.json(blog);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create blog failed");
  }
};

exports.listAll = async (req, res) => {
  let blogs = await Blog.find({})
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(blogs);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Blog.findOneAndRemove({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("blog delete failed");
  }
};
exports.read = async (req, res) => {
  let blog = await Blog.findOne({ slug: req.params.slug }).exec();
  res.json(blog);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Blog.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("blog update error", err);
    return res.status(400).send("blog update failed");
  }
};
exports.updateimg = async (req, res) => {
  try {
    const updated = await Blog.findOne({
      slug: req.params.slug,
    });
    if (req.file) {
      updated.image = req.file.path;
    }
    updated.save();
    res.json(updated);
  } catch (err) {
    console.log("blog update error", err);
    return res.status(400).send("blog update failed");
  }
};
