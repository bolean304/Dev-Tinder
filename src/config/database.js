const mongoose = require("mongoose");


const connectDB = async () =>{
await mongoose.connect(
    "mongodb+srv://user_devtinder:ghe5DLfysPjf0jJq@cluster0.e3bcy.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0"
)};
module.exports = {
    connectDB
};