const BookModel = require("../models/bookmodel");
const path = require("path");
const fs = require("fs");

// Add Book Form
module.exports.addBook = async (req, res) => {
  let isbn = "ISBN-" + Date.now();
  return res.render("todo", { isbn });
};

// Show Books
module.exports.showBooks = async (req, res) => {
  let allTask = await BookModel.find();
  return res.render("show", { allTask });
};

// Delete Book
module.exports.deleteBook = async (req, res) => {
  let book = await BookModel.findById(req.query.id);

  if (book.profile) {
    let fullPath = path.join(__dirname, "..", "uploads", book.profile);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
  await BookModel.findByIdAndDelete(req.query.id);
  return res.redirect("/show");
};

// Insert Book
module.exports.saveBook = async (req, res) => {
  if (req.file) {
    req.body.profile = req.file.filename; // ✅ sirf filename save karo
  }

   //convert string to integer
  if (req.body.totalBooks) {
    req.body.totalBooks = parseInt(req.body.totalBooks);
  }
  await BookModel.create(req.body);
  return res.redirect("/show");
};

// Edit Book Form
module.exports.editBook = async (req, res) => {
  let singleBook = await BookModel.findById(req.params.id);
  return res.render("update", { singleBook });
};

// Update Book
module.exports.updateBook = async (req, res) => {
  let book = await BookModel.findById(req.params.id);
  let image = book.profile;

  if (req.file) {
    if (book.profile) {
      let fullPath = path.join(__dirname, "..", "uploads", book.profile);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }
    image = req.file.filename; // ✅ sirf filename
  }

  req.body.profile = image;

  //convert string to integer
  if (req.body.totalBooks) {
    req.body.totalBooks = parseInt(req.body.totalBooks);
  }

  await BookModel.findByIdAndUpdate(req.params.id, req.body);
  return res.redirect("/show");
};
