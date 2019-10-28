
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
        Product.create({
            title,
            description: desc,
            price,
            img
        })
            .then(result => {
                res.status(200).redirect('/admin/view-products');
            })
            .catch(err => {
                res.status(500).redirect('/');
            });
    }
}

// USER - GET - GET ALL PRODUCTS
exports.getAllProducts = (req, res, next) => {
    const products = Product.findAll()
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
    const products = Product.findAll()
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

    Product.findByPk(productId)
        .then(data => {
            res.render('admin/edit-product', { product: data, edit: editMode, pageTitle: "Edit product", path: "edit-product" });
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
        Product.findByPk(id)
            .then(result => {
                result.title = title;
                result.img = img;
                result.price = price;
                result.description = description;
                return result.save();
            })
            .then(saved => {
                console.log(saved);
                res.redirect("/admin/view-products");

            })
            .catch(err => {
                console.log(err);
                res.redirect("/admin/view-products");
            })
    }
}

// USER - GET - PRODUCT DETAILS
exports.getProductDetails = (req, res, next) => {
    let productid = req.params.productid;
    const specificProduct = Product.findByPk(productid)
        .then(data => {
            console.log(data[0]);
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
        Product.findByPk(productid)
            .then(result => {
                return result.destroy();
            })
            .then(deleted => {
                res.redirect("/admin/view-products");
            })
            .catch(err => console.log(err));
    }
    else {
        res.redirect("/");
    }

}

