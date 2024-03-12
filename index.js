const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})



mongoose.connect(`mongodb+srv://petar:${process.env.DB_PW}@nodedb.dzpay08.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NodeDB`)
.then(() => {
  console.log('Connected to database!')
  app.listen(3000, ()=> {
    console.log('Server is running on port 3000')
  })
}).catch(() => {
  console.log('Connection failed!')
});