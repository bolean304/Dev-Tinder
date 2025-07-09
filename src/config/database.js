const mongoose = require("mongoose");


const connectDB = async () =>{
await mongoose.connect(
    "mongodb+srv://user_devtinder/devTinder?retryWrites=true&w=majority&appName=Cluster0"
)};
module.exports = {
    connectDB
};
