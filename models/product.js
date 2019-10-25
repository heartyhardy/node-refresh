const fs = require('fs');
const {_filedb} = require('../util/path');
const cartModel = require('../models/cart');

module.exports = class Product {
    constructor(id, title, img, price, description){
        this.id = id;
        this.title = title;
        this.img = img;
        this.price = price;
        this.description = description;
    }

    save(){

        return new Promise((resolve, reject) => {
            fs.readFile(_filedb, (err, content) => {
                let products = [];

                if(!err){

                    products = JSON.parse(content);

                    if(this.id){
                        let existing_product = products.findIndex(e => e.id === this.id);
                        let updated_product = [...products];
                        updated_product[existing_product] = this;
                        fs.writeFile(_filedb, JSON.stringify(updated_product), err => reject(err));

                        resolve(0);
                    }
                    else{
                        this.id = Math.random().toString();                
                        products.push(this);    
                        fs.writeFile(_filedb, JSON.stringify(products), err => reject(err));

                        resolve(0);
                    }
                }
                else{
                    this.id = Math.random().toString();                
                    products.push(this);    
                    fs.writeFile(_filedb, JSON.stringify(products), err => reject(err));
                    
                    resolve(0);
                }                
            })            
        });
    }

    static deleteById(id){

        return new Promise((resolve, reject) => {
            if(id){                
                
                fs.readFile(_filedb, (err, content) => {
                    
                    let products = [];

                    if(err){
                        reject(err);
                    }
                    else{
                        products = JSON.parse(content);
                        
                        let src_product = products.find(e => e.id === id);

                        let updated_products = products.filter(e => e.id != id);

                        fs.writeFile(_filedb, JSON.stringify(updated_products), error => reject(error));

                        cartModel.deleteById(id, src_product.price);

                        resolve(0);
                    }
                })  
            }
            else{
                reject("Id does not exist");
            }         
        })

    }

    static fetchAll(){
        return new Promise((resolve, reject) => {
            let products = [];
            
            fs.readFile(_filedb, (err, content) => {
                if(err){
                    reject(err);
                }
                else{
                    const data = JSON.parse(content);
                    resolve(data);
                }
            })           
        })

    }

    static getById(id){
        return new Promise((resolve, reject) => {
            let products = [];

            fs.readFile(_filedb, (err, content) => {
                if(err){
                    reject(err);
                }
                else{
                    const data = JSON.parse(content);
                    let srcElement = data.find(e => e.id === id);

                    if(srcElement){
                        resolve(srcElement);
                    }
                    else reject(null);
                }
            })
        })
    }

}