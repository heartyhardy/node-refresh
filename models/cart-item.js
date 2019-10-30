const Sequelize = require('sequelize');
const sequelize = require('../util/db-connect');

const CartItem = sequelize.define('cart-item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = CartItem