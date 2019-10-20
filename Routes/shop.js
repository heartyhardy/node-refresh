const express = require('express');
const router = express.Router();

const admin_data = require('./admin');

router.use((req, res, next) => {
    console.log("Processing a new request");
    next();
})

router.get("/", (req, res, next) => {
    res.render('shop', {products: admin_data.products, docTitle: 'Shop'});
})

module.exports = router;