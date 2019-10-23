const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.get('/view-products', productsController.viewAllProducts);

// Triggers only for GET method
router.get("/add-product", productsController.getAddProduct);

// Triggers only for POST method
router.post("/add-product", productsController.postAddProduct);

//  Has to be PUT
router.get("/edit-product", productsController.editProduct);

// Has to be DEL
router.post("/delete-product" , productsController.removeProduct);

module.exports = router;