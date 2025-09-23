const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://utsav:utsav123@cluster0.udjw2xj.mongodb.net/blogpr")

const db = mongoose.connection;

db.once('open',(err)=>{
  if(err){
    console.log(err);
    return ;
    
  }
  console.log("Database connected...");
})

module.exports = db;

