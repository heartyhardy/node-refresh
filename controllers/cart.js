const cart = require('../models/cart');

exports.viewCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: "Cart", path: "cart"});
}

exports.addToCart = (req, res, next) => {
    let productId = req.body.productId;
    let productPrice = req.body.productPrice;
    
    // + is used to covert the product price str to number
    cart.addProduct(productId, +productPrice);

    res.redirect("/cart");
}

exports.viewOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: "Orders", path: "orders"});
}

exports.checkout= (req, res, next) => {
    res.render('shop/checkout', {pageTitle: "Chekout", path: "checkout"});
}