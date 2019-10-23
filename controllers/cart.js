exports.getCart = (req, res, next) => {
    res.render('shop/cart', {pageTitle: "Cart", path: "cart"});
}

exports.checkout= (req, res, next) => {
    res.render('shop/checkout', {pageTitle: "Chekout", path: "checkout"});
}