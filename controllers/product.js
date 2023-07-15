const Product = require("../models/product");
const User = require("../models/user");
var slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      size,
      category,
      quantity,
      sold,
      shipping,
    } = req.body;
    const product = await new Product({
      title,
      description,
      price,
      category,
      size,
      quantity,
      sold,
      shipping,
      slug: slugify(title),
    });
    if (req.file) {
      product.image = req.file.path;
    }
    product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create product failed");
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .populate("category")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.list = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    let products = await Product.find({})
      .populate("category")
      .sort([[sort, order]])
      .limit(limit)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({ slug: req.params.slug });
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Product delete failed");
  }
};
exports.read = async (req, res) => {
  let products = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .exec();
  res.json(products);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("product update error", err);
    return res.status(400).send("product update failed");
  }
};
exports.updateimg = async (req, res) => {
  try {
    const updated = await Product.findOne({
      slug: req.params.slug,
    });
    if (req.file) {
      updated.image = req.file.path;
    }
    updated.save();
    res.json(updated);
  } catch (err) {
    console.log("product update error", err);
    return res.status(400).send("product update failed");
  }
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  const { star } = req.body;
  //check the use has already rate the product?

  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  //if user don't rate the product do it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    // console.log("ratingAdded",ratingAdded)
    res.json(ratingAdded);
  } else {
    //if rating we need to update that
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    // console.log('rating updated',ratingUpdated)
    res.json(ratingUpdated);
  }
};

// related product

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .exec();
  res.json(related);
};

//search /filter

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .exec();
  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({
      category,
    })
      .populate("category", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log("aggregates error", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .exec((err, products) => {
          if (err) console.log("product aggregate error", err);
          res.json(products);
        });
    });
};

const handleShipping = async (req, res, shipping) => {
  try {
    let products = await Product.find({
      shipping,
    })
      .populate("category", "_id name")
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, shipping } = req.body;

  if (query) {
    console.log("query", query);
    await handleQuery(req, res, query);
  }
  if (price !== undefined) {
    console.log("price", price);
    await handlePrice(req, res, price);
  }
  if (category) {
    console.log("category", category);
    await handleCategory(req, res, category);
  }
  if (stars) {
    console.log("star", stars);
    await handleStar(req, res, stars);
  }
  if (shipping) {
    console.log("shipping", shipping);
    await handleShipping(req, res, shipping);
  }
};
