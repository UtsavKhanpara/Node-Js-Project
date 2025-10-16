const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://utsav:utsav123@cluster0.udjw2xj.mongodb.net/productadminpanel")

const db = mongoose.connection;

db.once("open", (err) => {
    if (err) {
        console.log(err)
        return;
    }
    console.log("Database Connected")
})

module.exports = db;