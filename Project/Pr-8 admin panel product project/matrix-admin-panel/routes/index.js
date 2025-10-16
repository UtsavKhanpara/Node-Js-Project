const express = require("express");
const { loginUser, loginPage, logoutUser, forgotpassword, sendMailWithOTP, verifyotp, verifyotppage, resetpassword, resetpasswordpage, changepasswordpage, changepassword, viewprofilepage } = require("../controllers/authctl");
const passport = require("passport");
const localpassport = require("../config/middleware/localpassport");
const routes = express.Router();

routes.use("/admin", localpassport.checkadmin, require("./admin.routes"))

routes.use("/category", localpassport.checkadmin, require("./category.routes"))
routes.use("/subcategory", localpassport.checkadmin, require("./subcategory.routes"))
routes.use("/extracategory", localpassport.checkadmin, require("./extracategory.routes"))
routes.use("/product", localpassport.checkadmin, require("./product.routes"))
routes.get('/', loginPage)
routes.post('/login', passport.authenticate('local', { failureRedirect: "/" }), loginUser);
routes.get('/logout', logoutUser)
routes.get('/forgotpassword', forgotpassword)
routes.post('/sendMailWithOTP', sendMailWithOTP)
routes.get("/verifyotppage",localpassport.checkadmin, verifyotppage)
routes.post("/verifyotp", verifyotp)
routes.post("/resetpassword", resetpassword)
routes.get("/resetpasswordpage",localpassport.checkadmin, resetpasswordpage)
routes.get("/changepasswordpage",localpassport.checkadmin, changepasswordpage)
routes.post("/change-password", changepassword)
routes.get("/viewprofilepage",localpassport.checkadmin, viewprofilepage);
module.exports = routes;