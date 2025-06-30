const express = require("express")

const app = express()
// request Handler
app.use("/test",(req,res) =>{
  res.send("Hello from the test!")
})
app.use((req,res) =>{
  res.send("Hello from the root!")
})
app.listen(3000,() =>{
    console.log("server is successully listening")
} )
