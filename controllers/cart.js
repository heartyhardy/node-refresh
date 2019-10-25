const cartdb = require('../models/cart');
const productdb = require('../models/product');

exports.viewCart = (req, res, next) => {
    cartdb.getCart()
        .then(data => {
            
            productdb.fetchAll()
            .then(products_data => {

                const cart_products = [];

                products_data.forEach(e => {
                    let cartItem = data.products.find(el => el.id === e.id);
                    if(cartItem){
                        cart_products.push({product_data: e, qty: cartItem.qty});
                    }
                });
                console.log(cart_products);
                res.render('shop/cart', {products: cart_products, total: data.total, pageTitle: "Cart", path: "cart" });
            })
            .catch(error => console.log(error));

        })
        .catch(err => console.log(err));
}

exports.addToCart = (req, res, next) => {
    let productId = req.body.productId;
    let productPrice = req.body.productPrice;

    // + is used to covert the product price str to number
    cartdb.addProduct(productId, +productPrice);

    res.redirect("/cart");
}

exports.removeFromCart = (req, res, next) => {
    let productid = req.body.productid;
    console.log(productid);
    if(productid){
      productdb.getById(productid)
      .then(product => {
        cartdb.deleteById(productid, product.price);
        res.redirect("/cart");
      })
      .catch(err=>res.redirect("/cart"));
    }
    
}

exports.viewOrders = (req, res, next) => {
    res.render('shop/orders', { pageTitle: "Orders", path: "orders" });
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout', { pageTitle: "Chekout", path: "checkout" });
}