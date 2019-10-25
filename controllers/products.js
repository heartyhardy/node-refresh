
const Product = require('../models/product');

// ADMIN - GET - ADD PRODUCT
exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {edit: false, pageTitle: "Add a new product", path: "add-product"});
}

// ADMIN - POST - ADD PRODUCT
exports.postAddProduct = (req, res, next) => {

    let title = req.body.title;
    let img = req.body.imglink;
    let price = req.body.price;
    let desc = req.body.description;

    if(title && img && price && desc){
        const product = new Product(null, title, img, price, desc);
        product.save().then(isSuccessful => {
            console.log("Record saved!");
        })
        .catch(err => {
            console.log("Error");
        })
    }
    
    res.redirect("/admin/view-products");
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

    const editMode = req.query.edit === 'true' ? true : false;
    const productId = req.params.productid;

    if(!editMode || !productId){
        return res.redirect("/");
    }

    Product.getById(productId)
        .then(data => {
            res.render('admin/edit-product', {product: data, edit: editMode, pageTitle: "Edit product", path: "edit-product"});
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

    if(id && title && img && price && description){
        const existing_product = new Product(id, title, img, price, description);

        existing_product.save()
        .then(isSaved => {
            console.log("Record updated");
        })
        .catch(err=> console.log(err));
    }

    res.redirect("/admin/view-products");

}

// USER - GET - PRODUCT DETAILS
exports.getProductDetails = (req, res, next) => {
    let productid= req.params.productid;
    const specificProduct = Product.getById(productid)
        .then(data => {
            res.render('shop/product-detail', {product: data, pageTitle: data.title, path:"products"});
        })
        .catch(err => {
            console.log(err);
        })
}

// ADMIN - DEL - REMOVE PRODUCT
exports.removeProduct = (req, res, next) => {
    console.log("In remove");
    let productid = req.body.productid;

    if(productid){
        //remove
        Product.deleteById(productid)
        .then(isDeleted => {
            res.redirect("/admin/view-products");
        })
        .catch(err => console.log(err));
    }
    else{
        res.redirect("/");
    }

}

