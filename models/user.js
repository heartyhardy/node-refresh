
const { ObjectId } = require('mongodb');
const { db } = require('../util/db-connect');

class User {
    constructor(username, email, _id) {
        this.username = username;
        this.email = email;
        this._id = _id ? new ObjectId(this._id) : undefined;
    }

    save() {

        const _db = db();
        let dbop;

        if (this._id) {
            dbop = _db
                .collection('users')
                .updateOne({ _id: this._id }, { $set: this })
        } else {
            dbop = _db
                .collection('users')
                .insertOne(this);
        }
        return dbop
            .then(result => {
                console.log("Update/Insert successful");
            })
            .catch(err=> console.log(err));
    }

    static fetchAll() {
        const _db = db();
        _db
            .collection('users')
            .find()
            .toArray()
            .then(users => {
                return users;
            })
            .catch(err=>console.log(err));
    }

    static findById(id){
        const _db = db();
        return _db
            .collection('users')
            .findOne({_id: new ObjectId(id)})
            .then(user => {
                return user;
            })
            .catch(err=>console.log(err));
    }
}

module.exports = User;