const Contact = require("../models/contact");
var slugify = require("slugify");

exports.create = async (req, res, next) => {
  try {
    const { name, email, phone, address, message } = req.body;
    const contact = await new Contact({
      name,
      email,
      phone,
      address,
      message,
      slug: slugify(name),
    });
    contact.save();
    res.json(contact);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create contact failed");
  }
};

exports.list = async (req, res) => {
  const contact = await Contact.find({}).sort({ createdAt: -1 }).exec();
  res.json(contact);
};
exports.read = async (req, res) => {
  let contact = await Contact.findOne({ slug: req.params.slug }).exec();
  res.json(contact);
};

exports.contactStatus = async (req, res) => {
  const { contactId, isView } = req.body;
  let updated = await Contact.findByIdAndUpdate(
    contactId,
    { isView },
    { new: true }
  ).exec();

  res.json(updated);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Contact.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Category delete failed");
  }
};
