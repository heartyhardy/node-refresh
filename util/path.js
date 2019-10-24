const path = require('path');

const _root_ = path.dirname(process.mainModule.filename);
const _public = path.join(_root_, 'public');
const _data = path.join(_root_, 'data');
const _home = path.join(_root_, 'views');
const _shop = path.join(_home, "shop.html");
const _add_product = path.join(_home, "add-product.html");

const _not_found = path.join(_home, "404.html");

const _filedb = path.join(_data, 'products.json');
const _cartdb = path.join(_data, 'cart.json');


module.exports = {
    _root_,
    _public,
    _data,
    _home,
    _shop,
    _add_product,
    _not_found,
    _filedb,
    _cartdb
}