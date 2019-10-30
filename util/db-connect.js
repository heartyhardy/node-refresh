const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            'mongodb://localhost:27017/shop',
            { useUnifiedTopology: true }
        )
            .then(client => {
                console.log("Connected to MongoDb cloud");
                _db = client.db();
                resolve(null)
            })
            .catch(err => reject(err));
    })
}

const db = () => {
    console.log(_db);
    if (_db) {
        return _db;
    }
    throw "Not connected to database";
}

exports.connect = connect;
exports.db = db;
