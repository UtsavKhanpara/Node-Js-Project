const mailMessage = require("../config/middleware/mailMessage");
const AdminModel = require("../models/adminmodel");
const bcrypt = require("bcrypt");

//login page open only
module.exports.loginPage = (req, res) => {
  try {
    //user undefinded hoi to login page ma j rese
    if (req.cookies.admin == undefined || req.cookies.admin._id == undefined) {
      return res.render("Auth/login");
      //user mali jase to /admin ma redirect thase
    } else {
      return res.redirect("/admin");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/admin/addAdmin");
  }
};

//login submit page logic with code
module.exports.loginUser = async (req, res) => {
  try {
    let adminData = await AdminModel.findOne({ email: req.body.email });
    if (adminData) {
      let matchPass = await bcrypt.compare(
        req.body.password,
        adminData.password
      );
      if (matchPass) {
        res.cookie("admin", adminData);
        console.log("Login successfully");
        return res.redirect("/admin");
      } else {
        console.log("Password not match");
        return res.redirect("/");
      }
    } else {
      console.log("Admin not found");
      return res.redirect("/");
    }
  } catch (err) {
    console.log("Erorr Find");
    return res.redirect("/admin/addAdmin");
  }
};

//logout page code
module.exports.logoutUser = (req, res) => {
  res.clearCookie("admin");
  console.log("Logout successfully");
  return res.redirect("/");
};

//forgot password page open
module.exports.forgotpassword = async (req, res) => {
  try {
    return res.render("Auth/forgotpass");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

//forgot passsword form data page logic
module.exports.sendMailWithOTP = async (req, res) => {
  try {
    let admin=await AdminModel.findOne({email:req.body.email})
    if(!admin){
      return res.redirect("/")
    }
    let otp = Math.floor(Math.random() * 10000);

    let msg = {
      from: "khanparautsav@gmail.com",
      to: `${req.body.email  }`,
      subject: "Demo",
      html: `<p>Hello..Cofeee Helloo...HealthyFood  </p>
        <p>Your Otp is:- ${otp}</p>
      `,
    };
    await mailMessage.sendEmail(msg);
    res.cookie('otp',otp)
    res.cookie('email',req.body.email)
    return res.render("Auth/verifyotp")
      } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

module.exports.verifyotp = async (req,res) =>{
  try {
    let otp=req.cookies.otp;
    if(otp == req.body.otp){
      res.clearCookie('otp')
      return res.render("Auth/resetpassword")
    }
    else{
      return res.render("Auth/verifyotp");
    }
  } catch (error) {
    console.log("All Error")
  }
}

module.exports.verifyotppage = async (req, res) => {
  try {
    return res.render("Auth/verifyotp");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
};

module.exports.resetpasswordpage = async (req,res) =>{
  try {
    return res.render("Auth/resetpassword")
  } catch (error) {
    console.log(error)
  }
}


module.exports.resetpassword = async (req, res) => {
  try {
   let newpassword=req.body.newpassword
   let conformpassword=req.body.conformpassword

   if(newpassword !== conformpassword){
    return res.render("Auth/resetpassword")
   }

   let email=req.cookies.email;
   if(!email){
    console.log("Email Not Found")
    return res.redirect("Auth/verifyotp")
   }

   let hashpass= await bcrypt.hash(newpassword,10)

   await AdminModel.findOneAndUpdate({email:email},{password:hashpass})

   res.clearCookie('otp')
   res.clearCookie('email')

   console.log("Password Reset Done")
   return res.redirect("/")

  } catch (error) {
   console.log("Reset Password Error:", error);
    return res.redirect("/resetpassword");
  }
};

module.exports.changepasswordpage = async (req,res) =>{
  try {
    let admin=req.cookies.admin
    return res.render("Auth/changepassword",{admin})
  } catch (error) {
    console.log(error)
    return res.redirect("/")
  }
}

module.exports.changepassword = async (req,res) =>{
  try {
    let admin=req.cookies.admin;
    const {newpass,conformpass,oldpass} = req.body;

    let matchpassword=await bcrypt.compare(oldpass,admin.password)
    if(matchpassword){
      if(newpass == conformpass){
        let hashpass=await bcrypt.hash(newpass,10)
        await AdminModel.findByIdAndUpdate(admin._id,{password:hashpass})
        console.log("Password Changes Successfully")
        res.clearCookie("email")
        return res.redirect("/admin")
      }else{
         console.log("New End Conform Password Not Matched")
        return res.redirect("/change-password")
      }
    }else{
      console.log("Old Password not Matched")
        return res.redirect("/change-password")
    }
  } catch (error) {
    console.log("Undefined")
    return res.redirect("/change-password")
  }
}

module.exports.profilepage = async (req,res) =>{
  try {
    let admin=req.cookies.admin
    if(admin){
      return res.render("Auth/profilepage",{admin})
    }else{
      return res.redirect("/")
    }
  } catch (error) {
    console.log("erorr Page",error)
     return res.redirect("/")
  }
}
