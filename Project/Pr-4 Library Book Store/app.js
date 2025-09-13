const express = require("express");
const path = require("path");
const app = express();
const port = 9091;

// Database connection
require("./config/db"); 

// Middleware
app.use(express.urlencoded()); // for form data
app.use("/uploads", express.static("uploads"));

// View engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/index"));

// Server start
app.listen(port, (err) => {
  if (err) {
    console.error("Error starting server:", err);
    return;
  }
  console.log(`✅ Server is running at http://localhost:${port}`);
});
