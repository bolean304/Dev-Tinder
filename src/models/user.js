const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLen: 3
    },
    lastName: {
     type: String
    },
    emailId: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
          validate(value){
            if (!(validator.isEmail(value))){
              throw new Error("Invalid emailid !!")
            }
          }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender:{
        type:String,
        validate(value){
            if (!["male","female","others"].includes(value)){
                throw new Error("Gender in not valid")
            }
        }
    },
    photoUrl: {
        type: String
    },
    about:{
        type: String,
        default: "this is default about of the user"
    },
    skills: {
        type: [String]
    },
},{
    timestamps: true,
});
module.exports = mongoose.model("User", userSchema);
