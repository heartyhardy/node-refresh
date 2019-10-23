exports.addToCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: "Cart", path: "cart"});
}

exports.viewOrders = (req, res, next) => {
    res.render('shop/orders', {pageTitle: "Orders", path: "orders"});
}

exports.checkout= (req, res, next) => {
    res.render('shop/checkout', {pageTitle: "Chekout", path: "checkout"});
}