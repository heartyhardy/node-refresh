const express = require('express');
const router = express.Router();

const {_add_product} = require('../util/path');

const products = [];

// Triggers only for GET method
router.get("/add-product", (req, res, next) => {
    res.sendFile(_add_product);
})

// Triggers only for POST method
router.post("/add-product", (req, res, next) => {

    let newProduct = req.body.title;

    if(req.body.title){
        products.push({ title: newProduct});
    }
    res.redirect("/");
})

module.exports = {
    router,
    products
}