const Sequelize = require('sequelize');
const sequelize = require('../util/db-connect');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isAlpha:true,
            len: [2,150]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            isLowercase: true,
            len: [7,50],
        }
    }
})

module.exports = User