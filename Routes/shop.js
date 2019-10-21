const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');

router.use((req, res, next) => {
    console.log("Processing a new request");
    next();
})

router.get("/", productsController.getAllProducts);

module.exports = router;