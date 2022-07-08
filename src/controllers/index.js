const sequelize = require('../db');
const Product = require('../models/Product')
const debug = require('debug')('app:controllers');
const { validationResult} = require('express-validator');

/**
 * 
 * @desc Gets all products
 * @route Get /api/productsnpm
 * @acess Public 
 */

exports.getProductbyId = async (req, res) => {
    const productId = req.params.id;

    const product = await Product.findByPk(productId);

    if (!product) {
        res.status(400).json({success: false, message: 'Product not found'})
    }

    res
    .status(200).json({product, success: true, message: "Product returned successfully"})
}
exports.getAllProducts = async (req, res) => {
    const products = await Product.findAll(); 
 
    if(!products) {
     res.
     status(400)
     .json({success: false, message: "All products were not retrieved"});
    }
 
 res 
   .status(200)
   .json({products, success: true, message: "All products returned" });
 }

 /**
  * @desc Delete single product
  * 
  */

 exports.deleteProductById = async (req, res) => {
    const productId = req.params.id
    const productToDelete = await Product.findByPk(productId)

    if(!productToDelete) {
        res.status(400).json({success: false, message: 'Product not found'})
}   else {
    const deletedProduct = await productToDelete.destroy();
    res
    .status(200)
    .json({deletedProduct, success: true, message: 'Product successfully deleted'})
}
 }
/*
 try {
    const productToDelete = await Product.findByPk(productId);
    const deletedProduct = await productToDelete.destroy();

    res.status(200).json({deletedProduct, success: true, message: 'Product successfully deleted'});
 } catch (error) {
    debug('Error: ', error);
    res
    .json({success: false, message: 'Unable to delete'})
 }; */

 /**
  * @desc Create single product
  * @route POST api/products/create
  * @access Private
  */
 exports.createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({success: false, error: errors.array( )})
    } else {

    
    try {
        const newProduct = req.body;
        const createdProduct = await Product.create(newProduct)
        res.status(200).json({
            createdProduct, 
            success: true, 
            message: "Product successfully created",
        });
        
    } catch(error) {
        debug(error);
        res.status(400).json({
            success: false, 
            message: "Product not created",
        });
    }
 };
}

 /**
  * @desc Update single product by ID
  * @route PUT api/products/update/:id
  * @access Private
  */

  exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updateProduct = req.body;
  
    try {
      const existingProduct = await Product.findByPk(productId); //getting product to update
      debug(existingProduct);
  
      const productToUpdate = await existingProduct.update(updateProduct);
  
      res.status(200).json({
        productToUpdate,
        success: true,
        message: 'Product updated successfully!',
      });
    } catch (error) {
      debug(error);
      res.status(400).json({
        success: false,
        message: `Unable to update: ${error.message}`,
      });
    }
  };

  /**
  * @desc Search for title of all product by query
  * @route GET api/products/search
  * @access Public
  */

  exports.searchByTitle = async (req, res) => {
   // debug('Queries: ', req.query);
    //res.json({ success: true, queries: req.query })

    try {
      const allProducts = await Product.findAll();

      if(!allProducts ||  req.query.title) {
        res.status(400).json({
          success: false, message: 'Unable to find product from input'})
      } else {
        const titleSearched = req.query.title.toLowerCase();

        const productsFound = allProducts.filter((product) => {
          product.title.toLowerCase().includes(titleSearched);

          res.status(200).json({
            success: true,
            productsFound,
            message: 'Products returned successfully'
          })
        });
      }

    } catch(error) {
      debug(error);
      res.status(400).json({
        success: false,
        message: 'Search was unsuccessful',
      });
    }
   
  };