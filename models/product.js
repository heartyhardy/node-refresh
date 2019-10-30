const {ObjectId} = require('mongodb');
const db = require('../util/db-connect').db;

class Product {
    constructor(title, price, description, img, id) {
        this.title = title,
            this.price = price,
            this.description = description,
            this.img = img
            id ? this._id= new ObjectId(id) : undefined;
    }

    save() {
        const _db = db();
        let dbop;
        if(this._id){
            //Update
            dbop = _db
            .collection('products')
            .updateOne({_id: this._id}, {$set:this})
        }
        else{
           dbop = _db
            .collection('products').insertOne(this)
        }
        return dbop
            .then(result => {
                console.log("INS", result);
            })
            .catch(err => console.log(err));
    }

    static fetchAll() {
        const _db = db();
        return _db.collection('products')
            .find()
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static fetchById(id) {
        const _db = db();
        return _db.collection('products')
            .find({ _id: new ObjectId(id) })
            .next()
            .then(product=> {
                return product;
            })
            .catch(err=>console.log(err));
    }

    static deleteById(id){
        const _db = db();
        return _db.collection('products')
            .deleteOne({_id: new ObjectId(id)})
            .then(result=>{
                console.log(result);
            })
            .catch(err=>console.log());
    }
}

module.exports = Product;

