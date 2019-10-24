const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');

router.use((req, res, next) => {
    console.log("Processing a new request");
    next();
})

router.get("/products", productsController.getAllProducts);

router.get("/products/:productid", productsController.getProductDetails);

router.get("/orders", cartController.viewOrders);

router.post("/cart", cartController.addToCart);

router.get("/checkout", cartController.checkout);

module.exports = router;