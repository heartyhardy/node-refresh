const path = require('path');

const _root_ = process.mainModule.filename;
const _home = path.join(_root_, '../', 'views');
const _shop = path.join(_home, "shop.html");
const _add_product = path.join(_home, "add-product.html");

const _not_found = path.join(_home, "404.html");

module.exports = {
    _root_,
    _home,
    _shop,
    _add_product,
    _not_found
}