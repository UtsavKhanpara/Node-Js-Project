const express=require("express");
const { loginUser, loginPage , logoutUser , profilepage , changepassword , changepasswordpage, forgotpassword , sendMailWithOTP , verifyotp , verifyotppage , resetpassword , resetpasswordpage} = require("../controllers/authctl");
const routes=express.Router();
//dashboard page open
routes.use("/admin",require("./admin.routes"))
routes.use("/blog", require("./blog.routes"))
//login page open
routes.get('/',loginPage)
//form data loginpage
routes.post('/login',loginUser)
//logout page
routes.get('/logout',logoutUser)
//forgot password page
routes.get('/forgotpassword',forgotpassword)
//form submit forgotpassword page
routes.post('/sendMailWithOTP',sendMailWithOTP)
routes.get("/verifyotppage",verifyotppage)
routes.post("/verifyotp",verifyotp)
routes.post("/resetpassword",resetpassword)
routes.get("/resetpasswordpage",resetpasswordpage)
routes.get("/change-password",changepasswordpage)
routes.post("/change-password",changepassword)
routes.get("/profile",profilepage)
module.exports=routes;


