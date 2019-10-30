const cartdb = require('../models/cart');
const productdb = require('../models/product');

exports.viewCart = (req, res, next) => {

    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products=> {
            res.render('shop/cart', { products: products, total: 0, pageTitle: "Cart", path: "cart" });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        })
}

exports.addToCart = (req, res, next) => {
    let productId = req.body.productId;
    let productPrice = req.body.productPrice;

    // + is used to covert the product price str to number
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts({where: {id:productId}});
        })
        .then(products => {
            let product;
            if(products.length > 0){
                product = products[0];
            }
            let qty = 1;
            if(product){
                
            }
        })
        .catch(err=>console.log(err));

    res.redirect("/cart");
}

exports.removeFromCart = (req, res, next) => {
    let productid = req.body.productid;
    console.log(productid);
    if (productid) {
        productdb.getById(productid)
            .then(product => {
                cartdb.deleteById(productid, product.price);
                res.redirect("/cart");
            })
            .catch(err => res.redirect("/cart"));
    }

}

exports.viewOrders = (req, res, next) => {
    res.render('shop/orders', { pageTitle: "Orders", path: "orders" });
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: "Chekout", path: "checkout" });
}