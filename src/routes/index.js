const express = require('express');
const debug = require('debug')('app:routes');

const sequelize = require('../db');
const Product = require('../models/Product');

const {check} = require('express-validator');
const router = express.Router();

const {
getAllProducts,
getProductbyId,
deleteProductById,
createProduct,
updateProduct,
searchByTitle,
} = require('../controllers/index');

router.get('/products', getAllProducts);
router.get('/products/search', searchByTitle);
router.get('/products/:id', getProductbyId);
router.delete('/products/delete/:id', deleteProductById);
router.post(
    '/products/create', 
[
check('title').not().isEmpty().trim(), 
check('description').not().isEmpty().trim(),
],
createProduct);
router.put('/products/update/:id', 
[
    check('title').not().isEmpty().trim(),
    check('description').not().isEmpty().trim(),
    check('description').not().isEmpty().trim(),
    check('price').custom((value) => value > 0),
    check('image').not().isEmpty().trim(),
],
    updateProduct);


module.exports = router;