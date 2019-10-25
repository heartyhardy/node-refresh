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

    static deleteById = (id, price) =>{

        if(id){
            fs.readFile(_cartdb, (err, content) => {
                if(!err){
                    let cart = JSON.parse(content);

                    let del_product = cart.products.find(e => e.id === id)
                    if(del_product){
                        let price_reduction = del_product.qty * price;

                        let updated_products = cart.products.filter(e => e.id != id);
                        let updated_total = cart.total - price_reduction;
    
                        let updated_cart = {products: [...updated_products], total: updated_total }
    
                        fs.writeFile(_cartdb, JSON.stringify(updated_cart), err => console.log(err));
                    }
                }
            })            
        }
    }

    static getCart = () => {
        return new Promise((resolve, reject) => {
            let cart = {};
            fs.readFile(_cartdb, (err, content) => {
                if(err){
                    reject(err);
                }
                else{
                    cart = JSON.parse(content);
                    resolve(cart);
                }
            })
        })
    }
}