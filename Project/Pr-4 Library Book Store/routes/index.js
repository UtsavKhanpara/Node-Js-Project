const express = require('express');
const routes = express.Router();
const BookModel = require('../models/bookmodel'); // model import
const bookCtr = require('../controllers/Bookctr'); // controller import

routes.get("/dashboard", (req, res) => {
    res.render("dashboard");
});

// Add Book Form
routes.get('/', bookCtr.addBook);

// Show All Books
routes.get('/show', bookCtr.showBooks);

// Delete Book
routes.get('/deleteBook', bookCtr.deleteBook);

// Save Book (Add Book)
routes.post('/bookdata', BookModel.uploadImage, bookCtr.saveBook);

// Edit Book Form
routes.get('/editBook/:id', bookCtr.editBook);

// Update Book
routes.post('/updateBook/:id', BookModel.uploadImage, bookCtr.updateBook);

module.exports = routes;
