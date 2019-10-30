const {ObjectId} = require('mongodb');
const Product = require('../models/product');

// ADMIN - GET - ADD PRODUCT
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', { edit: false, pageTitle: "Add a new product", path: "add-product" });
}

// ADMIN - POST - ADD PRODUCT
exports.postAddProduct = (req, res, next) => {

    let title = req.body.title;
    let img = req.body.imglink;
    let price = req.body.price;
    let desc = req.body.description;

    if (title && img && price && desc) {

        const product = new Product(title, price, desc, img);
        
        product.save()
            .then(result => {
                console.log("ADDD", result);
                res.status(200).redirect('/admin/view-products');
            })
            .catch(err=> {
                console.log("ERROR", err);
                res.status(500).redirect('/');
            });
    }
}

// USER - GET - GET ALL PRODUCTS
exports.getAllProducts = (req, res, next) => {
    const products = Product.fetchAll()
        .then(data => {
            res.render(
                'shop/list-products', { products: data, pageTitle: "Shop", path: "products" });
        })
        .catch(err => {
            console.log(err);
            res.render('shop/list-products', { products: [], pageTitle: "Shop", path: "products" });
        })
}

// ADMIN - GET - VIEW PRODUCTS
exports.viewAllProducts = (req, res, next) => {
    const products = Product.fetchAll()
        .then(data => {
            res.render(
                'admin/view-products', { products: data, pageTitle: "Admin - View products", path: "view-products" });
        })
        .catch(err => {
            console.log(err);
            res.render('admin/view-products', { products: [], pageTitle: "Admin - View products", path: "view-products" });
        })
}


// ADMIN - PUT - EDIT PRODUCT
exports.editProduct = (req, res, next) => {

    const editMode = req.query.edit === 'true' ? true : false;
    const productId = req.params.productid;

    if (!editMode || !productId) {
        return res.redirect("/");
    }

    const products = Product.fetchById(productId)
        .then(data => {
            const product = data;
            res.render('admin/edit-product', { product: product, edit: editMode, pageTitle: "Edit product", path: "edit-product" });
        })
        .catch(err => {
            return res.redirect("/");
        })
}

exports.updateProduct = (req, res, next) => {

    let id = req.body.productid;
    let title = req.body.title;
    let img = req.body.imglink;
    let price = req.body.price;
    let description = req.body.description;

    if (id && title && img && price && description) {

        const product = new Product(title, price,description,img, id);
        product.save()
            .then(saved => {
                res.redirect("/admin/view-products");

            })
            .catch(err => {
                res.redirect("/admin/view-products");
            })
    }
}

// USER - GET - PRODUCT DETAILS
exports.getProductDetails = (req, res, next) => {
    let productid = req.params.productid;
    const specificProduct = Product.fetchById(productid)
        .then(data => {
            res.render('shop/product-detail', { product: data, pageTitle: data.title, path: "products" });
        })
        .catch(err => {
            console.log(err);
        })
}

// ADMIN - DEL - REMOVE PRODUCT
exports.removeProduct = (req, res, next) => {

    let productid = req.body.productid;

    if (productid) {
        //remove
        const products = Product.deleteById(productid)
            .then(() => {
                console.log("Deleted a record");
                res.redirect("/admin/view-products");
            })
            .catch(err => console.log(err));
    }
    else {
        res.redirect("/");
    }

}

