const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/product.model');

const app = express()
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/products', async (req, res) => {
  try{
    const product = await Product.create(req.body);
    res.status(201).json(product)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

app.get('/products', async (req, res) => {
  try{
    const products = await Product.find().exec();
    res.status(200).json(products)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

app.get('/products/:id', async (req, res) => {
  try{
    const product = await Product.findById(req.params.id).exec();
    res.status(200).json(product)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

app.put('/products/:id', async (req, res) => {
  try{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec();
    if(!product) {
      return res.status(404).json({message: 'Product not found!'})
    }
    res.status(200).json(product)
  } catch(err) {
    res.status(500).json({message: err.message})
  }});

app.delete('/products/:id', async (req, res) => {
  try{
    const product = await Product.findByIdAndDelete(req.params.id).exec();
    if(!product) {
      return res.status(404).json({message: 'Product not found!'})
    }
    res.status(200).json({message: 'Product deleted successfully!'})
  } catch(err) {
    res.status(500).json({message: err.message})
  }
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