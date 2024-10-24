const express = require('express')
const app = express()
const port = 7777

app.get('/user', (req, res) => {
  res.send({ firstName: " Ankit" , lastName: "chauhan"})
})
app.post('/user', (req, res) => {
  console.log("save data to db")
  res.send('successfully saved data to database')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})