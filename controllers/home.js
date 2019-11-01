const Product = require('../models/product');

// USER - GET - GET ALL PRODUCTS
exports.getHomepage = (req, res, next) => {
    
    //set a cookie
    req.session.isLoggedIn = true;
    // req.session.save((err) => {
    //     console.log("SESSION SAVED!")
    // })

    const products = Product.fetchAll()
        .then(data => {
            res.setHeader("Set-Cookie","loggedIn=true");
            res.render(
                'shop/index', {products: data, pageTitle: "Shop", path: "shop"});
        })
        .catch(err => {
            console.log(err);
            res.render('shop/index', {products: [], pageTitle: "Shop", path: "shop"});
        })
}