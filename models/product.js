const _db = require('../util/db-connect');
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
        let values = [this.title, this.description, this.price, this.img];
        return _db.execute(`INSERT INTO products (title, description, price, img) VALUES(?, ?, ?, ?)`, values);
    }

    static deleteById(id){

    }

    static fetchAll(){
        return _db.execute("SELECT * FROM products");
    }

    static getById(id){
        return _db.execute(`SELECT * FROM products WHERE id = ?`, [id]);
    }

}