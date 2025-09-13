const mongoose = require("mongoose");

const imageUpload = "/uploads";
const multer = require("multer");
const path = require("path");

const bookSchema = mongoose.Schema({
  title: {
    // Book Title
    type: String,
    required: true,
  },
  author: {
    // Author
    type: String,
    required: true,
  },
  isbn: {
    // ISBN Number
    type: String,
    required: true,
    unique: true,
  },
  genre: {
    // Genre
    type: String,
    required: true,
  },
  totalBooks: {
    // Total Books
    type: Number,
    required: true,
  },
  profile: {
    // Book Image
    type: String,
    required: true,
  },
});

// Multer storage setup for image upload
const storageBook = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", imageUpload));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now()
    );
  },
});

bookSchema.statics.uploadImage = multer({ storage: storageBook }).single(
  "profile"
);

const BookModel = mongoose.model("Book", bookSchema);

module.exports = BookModel;
