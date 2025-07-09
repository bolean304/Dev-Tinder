const express = require("express");
const {connectDB} = require("./config/database");
const User= require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const app = express();
app.use(express.json());
// signup request Handler
app.post("/signup",async (req,res)=>{
    try{
    //vaildate of incoming request
    validateSignUpData(req)  
    // Encrypt the passwords
    const {firstName,lastName,emailId,password} = req.body;
    const passwordHash = await bcrypt.hash(password,10);
    const user = new User({
        firstName,
        lastName,
        emailId,
        password: passwordHash,
    });
    await user.save();
    res.status(201).send("user added successfully!!");
    }catch(err){
    console.error("Error saving user:", err);
    res.status(500).send("Failed to create user");
    };
    
});

app.post("/login",async (req,res)=> {
     try{
        const {emailId, password}= req.body;
        // fisrt check user exists or not
        const user =await User.findOne({emailId: emailId});
        console.log("user :"+user);
        if (!user){
            throw new Error("user not exists")
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (isPasswordValid) {
            res.send("log in successfull !!")
        }else{
            throw new Error("Invalid user !!")
        }
     }catch(err){
        res.status(400).send("error:"+err.message)
     }
});
app.patch("/user/:userId",async (req,res) => {
   const userId = req.params.userId;
   console.log(userId)
   const data = req.body;

   const ALLOWED_UPDATES = [
    "photoUrl", "about","gender","age"
   ];
   const isUpdateAllowed = Object.keys(data).every(k =>
       ALLOWED_UPDATES.includes(k)
);
if (!isUpdateAllowed){
    res.status(400).send("update not allowed")
    return
}
try{
   const user= await User.findByIdAndUpdate({id: userId},data,{
    returnDocument: "after",
    runValidators: true,
   });
   console.log(user);
   res.Send("User Updated successfully!!");
}catch(err){
   res.status(400).send("updated failed:"+err.message);
}
})
app.get("/getUser",async (req,res) => {
    const useremail = req.body.emailId
    try{
    const userData  = await   User.find({emailId: useremail})
    if (userData.length === 0){
        res.status(200).send("no user found")
        return 
    }
    res.status(200).send(userData)
    }catch(err){
        res.status(400).send("something went wrong")
    }
   
})
// feed API = get all the users from the database
app.get("/feed",async (req,res) => {
  try{
const userData  = await   User.find({})
    res.status(200).send(userData)
    }catch(err){
        res.status(400).send("something went wrong")
    }
})
app.delete("/delete-user", async (req,res)=>{
    const userId = req.body.userId
    try{
      const user =  await User.findByIdAndDelete(userId)
      res.send("user deleted successfully!!")
    }catch(err){
       res.status(500).send("could not delete user !!")
    }
})
connectDB().then(() => {
    console.log("database connection established...");
    app.listen(3000,() =>{
    console.log("server is successully listening");
});
})
.catch(err =>{
    console.log("database connection failed...")
    console.log(err)
});

