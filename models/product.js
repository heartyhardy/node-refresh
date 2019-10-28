const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../util/db-connect');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    img: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = Product;

