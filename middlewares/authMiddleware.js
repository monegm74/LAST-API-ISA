const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
      try {
        if (token) {
          const decoded = jwt.verify(token, process.env.JWT_SecretKey);
          const user = await User.findById(decoded?.id);
  
          if (!user) {
            return res.status(401).json({ message: "User not found. Token invalid." });
          }
  
          req.user = user;
          next();
        }
      } catch (error) {
        return res.status(401).json({ message: "Not authorized", error: error.message });
      }
    } else {
      return res.status(401).json({ message: "There is No Token With The Header" });
    }
  });
  

const isAdmin = asyncHandler(async (req,res,next) =>{
    const {email} = req.user;
    const adminUser = await User.findOne({email});
    if(adminUser.role !== "admin"){
        throw new Error("You don't have Admin Privileges");
    }
    else{
        next();
    }
});

module.exports = {authMiddleware, isAdmin};