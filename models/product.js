const fs = require('fs');
const {_filedb} = require('../util/path');

module.exports = class Product {
    constructor(title, img, price, description){
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
                    resolve(0);
                }
                products.push(this);

                fs.writeFile(_filedb, JSON.stringify(products), err => reject(err));
            })            
        });


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
}