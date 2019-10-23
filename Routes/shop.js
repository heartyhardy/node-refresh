const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');

router.use((req, res, next) => {
    console.log("Processing a new request");
    next();
})

router.get("/products", productsController.getAllProducts);

router.get("/product-details" , productsController.getProductDetails);

router.get("/cart", cartController.getCart);

router.get("/checkout", cartController.checkout);

module.exports = router;