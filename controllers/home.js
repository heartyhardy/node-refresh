const Product = require('../models/product');

// USER - GET - GET ALL PRODUCTS
exports.getHomepage = (req, res, next) => {
    const products = Product.fetchAll()
        .then(data => {
            res.render(
                'shop/index', {products: data[0], pageTitle: "Shop", path: "shop"});
        })
        .catch(err => {
            console.log(err);
            res.render('shop/index', {products: [], pageTitle: "Shop", path: "shop"});
        })
}