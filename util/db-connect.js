const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123321',
    database: 'udemy-node-max'
})

module.exports = pool.promise();