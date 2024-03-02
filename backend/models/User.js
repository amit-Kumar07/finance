const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true, 
        trim: true,
    },
    lastName:{
        type:String,
        required:true,
        trim: true,
    },
    userName:{
        type:String,
        required:true, 
        unique:true,
        trim: true,
    },
    role:{
            type: String,
        },
        phone: {
            type: String,
            required: true,
            validate: {
              validator: function(v) {
                // Regular expression to match exactly 10 digits
                return /^\d{10}$/.test(v);
              },
              message: props => `${props.value} is not a valid phone number! Must contain exactly 10 digits.`
            }
          },
    branch:{
        type:String,
       },
   updated: { type: Date, default: Date.now },
   created:{ type: Date, default: Date.now },
})


module.exports = mongoose.model("user", userSchema)