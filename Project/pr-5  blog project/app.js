const express = require('express');
const path = require('path');
const blogModel = require('./model/blogModel');
const db = require('./config/db'); 

const app = express();
const port = 9000;

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// Add Blog Page
app.get('/add', (req, res) => {
  return res.render('addBlog'); // matches addBlog.ejs
});

// Add Blog POST
app.post('/addBlog', blogModel.imageUpload, async (req, res) => {
  if (req.file) {
    req.body.image = '/uploads/' + req.file.filename;
  }
  await blogModel.create(req.body);
  return res.redirect('/');
});

// Home Page / Blog List
app.get('/', async (req, res) => {
  const allBlog = await blogModel.find();
  return res.render('viewBlog', { // matches viewBlog.ejs
    allBlog
  });
});

// Single Blog Page
app.get('/viewSingleBlog/:id', async (req, res) => {
  const single = await blogModel.findById(req.params.id);
  return res.render('viewSingleBlog', { // matches viewSingleBlog.ejs
    single
  });
});

// ---------- START SERVER ----------
app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is running on http://localhost:${port}`);
});
