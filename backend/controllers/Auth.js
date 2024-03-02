const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//signup controller
exports.signup = async(req, res) => {
    try{
     const {firstName, lastName, userName, password} = req.body;

     if(!firstName || !lastName || !userName || !password){
        return res.status(403).send({success:false,
        message:"All fields are required"})
     }
    
     const existingaUser = await Auth.findOne({userName});
     if(existingaUser){
        return res.status(400).json({
            success:false,
            message:`User already exist`
        });
     }

     //hashing password
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = await Auth.create({
        firstName,
        lastName,
        userName,
        password:hashedPassword
     });
     return res.status(200).json({
        success:true,
        user,
        message:"User registered successfully",
     });
    }catch(error){
        console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
    }
}


//login controller 

exports.login = async(req, res) => {
    try{
        const {userName, password}  = req.body;
        if(!userName || !password){
            return res.status(400).json({
                success:false,
                message:`Please fill up all the require fileds`
            })
        }
        const user = await Auth.findOne({userName});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registerd with us Please signup to continue"
            })
        }
        if(await bcrypt.compare(password, user.password)){
           const token = jwt.sign(
            {userName:user.userName, id:user._id},
            process.env.JWT_SECRET,
            {
                expiresIn:"24h"
            }
           );
           user.token = token;
           user.password = undefined;
           const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
           };
           res.cookie("token", token, options).status(200).json({
            success:true,
            token,
            user,
            message:"User Login Success"
           });
        }else{
            return res.status(401).json({
                success:false,
                message:`Password is incorrect`
            })
        }
    }catch(error){
        console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});
    }
}