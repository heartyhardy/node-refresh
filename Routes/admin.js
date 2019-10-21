const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

// Triggers only for GET method
router.get("/add-product", productsController.getAddProduct);

// Triggers only for POST method
router.post("/add-product", productsController.postAddProduct);

module.exports = router;