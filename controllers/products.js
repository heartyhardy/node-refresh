const Product = require('../models/product');

// ADMIN - GET - ADD PRODUCT
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {pageTitle: "Add a new product", path: "add-product"});
}

// ADMIN - POST - ADD PRODUCT
exports.postAddProduct = (req, res, next) => {

    let title = req.body.title;
    let img = req.body.imglink;
    let price = req.body.price;
    let desc = req.body.description;

    if(req.body.title && img && price && desc){
        const product = new Product(title, img, price, desc);
        product.save().then(isSuccessful => {
            console.log("Record saved!");
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    res.redirect("/");
}

// USER - GET - GET ALL PRODUCTS
exports.getAllProducts = (req, res, next) => {
    const products = Product.fetchAll()
        .then(data => {
            res.render(
                'shop/list-products', {products: data, pageTitle: "Shop", path: "products"});
        })
        .catch(err => {
            console.log(err);
            res.render('shop/list-products', {products: [], pageTitle: "Shop", path: "products"});
        })
}

// ADMIN - GET - VIEW PRODUCTS
exports.viewAllProducts = (req, res, next) => {
    const products = Product.fetchAll()
        .then(data => {
            res.render(
                'admin/view-products', {products: data, pageTitle: "Admin - View products", path: "view-products"});
        })
        .catch(err => {
            console.log(err);
            res.render('admin/view-products', {products: [], pageTitle: "Admin - View products", path: "view-products"});
        })
}


// ADMIN - PUT - EDIT PRODUCT
exports.editProduct = (req, res, next) => {
    res.render('admin/edit-product', {pageTitle: "Edit product", path: ""});
}

// USER - GET - PRODUCT DETAILS
exports.getProductDetails = (req, res, next) => {
    res.render('shop/product-detail', {pageTitle: "Product details", path:"product-detail"});
}

// ADMIN - DEL - REMOVE PRODUCT
exports.removeProduct = (req, res, next) => {
    res.render('admin/remove-product', {pageTitle: "Remove product", path:"remove-product"});
}

