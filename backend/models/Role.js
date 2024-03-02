const mongoose = require("mongoose");


const roleSchema = new mongoose.Schema({
    roleName:{
        type:String,
        required:true, 
        trim: true,
    },
    description:{
        type:String,
        required:true,
        trim: true,
    },
   
   updated: { type: Date, default: Date.now },
   created:{ type: Date, default: Date.now },
})

module.exports = mongoose.model("role", roleSchema)