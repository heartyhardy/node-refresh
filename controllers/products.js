const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render(
        'add-product', {pageTitle: "Add a new product", path: "add-product"});
}

exports.postAddProduct = (req, res, next) => {

    let newProduct = req.body.title;

    if(req.body.title){
        const product = new Product(newProduct);
        product.save();
    }
    
    res.redirect("/");
}

exports.getAllProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {products: products, pageTitle: "Shop", path: "shop"});
}

