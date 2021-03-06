const Sequelize = require('sequelize');
const sequelize = require('../util/db-connect');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    }
})

module.exports = Cart