const Product = require('../models/product.model');


const express = require('express');
const router = express.Router();
// TODO move controllers into separate folder

router.get('/', async (req, res) => {
  try{
    const products = await Product.find().exec();
    res.status(200).json(products)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

router.post('/',  async (req, res) => {
  try{
    const product = await Product.create(req.body);
    res.status(201).json(product)
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

router.route('/:id')
  .get(async (req, res) => {
    try{
      const product = await Product.findById(req.params.id).exec();
      res.status(200).json(product)
    } catch(err) {
      res.status(500).json({message: err.message})
    }
  })
  .put(async (req, res) => {
    try{
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true}).exec();
      if(!product) {
        return res.status(404).json({message: 'Product not found!'})
      }
      res.status(200).json(product)
    } catch(err) {
      res.status(500).json({message: err.message})
    }})
    .delete(async (req, res) => {
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

module.exports = router;