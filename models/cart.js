const fs = require('fs');
const {_cartdb} = require('../util/path');

module.exports = class Cart{
    static addProduct = (id, price) => {
        let cart = {products: [], total:0};
        fs.readFile(_cartdb, (err, content) => {
            if(!err){
                cart = JSON.parse(content);
            }

            const existing_product_index = cart.products.findIndex(e=> e.id === id);
            const existing_product = cart.products[existing_product_index];
            let updated_product;

            if(existing_product){
                updated_product = {...existing_product};
                updated_product.qty = updated_product.qty + 1;
                cart.products = [...cart.products];
                cart.products[existing_product_index] = updated_product;
            }
            else{
                updated_product = {id: id, qty: 1};
                cart.products = [...cart.products, updated_product];
            }

            cart.total = cart.total + price;

            fs.writeFile(_cartdb, JSON.stringify(cart), err => {
                //console.log(err);
            })
        })
    }
}