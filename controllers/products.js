const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: "Add a new product", path: "add-product"});
}

exports.postAddProduct = (req, res, next) => {

    let newProduct = req.body.title;

    if(req.body.title){
        const product = new Product(newProduct);
        product.save().then(isSuccessful => {
            console.log("File saved!");
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    res.redirect("/");
}

exports.getAllProducts = (req, res, next) => {
    const products = Product.fetchAll()
        .then(data => {
            res.render('shop/list-products', {products: data, pageTitle: "Shop", path: "shop"});
        })
        .catch(err => {
            console.log(err);
            res.render('shop/list-products', {products: [], pageTitle: "Shop", path: "shop"});
        })
}

