const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    token: {
        type: String,
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("auth", authSchema)