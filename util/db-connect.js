
const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('udemy-node-max', 'root', '123321', {
    host: 'localhost', dialect: 'mysql'
});

module.exports = sequelize;