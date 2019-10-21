const express = require('express');
const router = express.Router();

const products = [];

// Triggers only for GET method
router.get("/add-product", (req, res, next) => {
    res.render('add-product', {pageTitle: "Add a new product", path: 'add-product'});
})

// Triggers only for POST method
router.post("/add-product", (req, res, next) => {

    let newProduct = req.body.title;

    if(req.body.title){
        products.push({ title: newProduct });
    }
    
    res.redirect("/");
})

module.exports = {
    router,
    products
}