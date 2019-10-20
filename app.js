const express = require('express');
const bparser = require('body-parser');

const admin_route = require('./Routes/admin');
const shop_route = require('./Routes/shop');
const err_route = require('./Routes/404');

const {_public} =require('./util/path');

const PORT = 3000;
    
const app = express();

// Set Templating engine and views folder
app.set('view engine', 'pug');
// Not required as 'views' is the default value set by express
app.set('views', 'views');

// Use parser

// bparser.urlencoded registers a another middleware
// This object will contain key-value pairs,
// where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bparser.urlencoded({extended:false}));

// Using middleware

// Using routes
app.use(express.static(_public));
app.use("/admin",admin_route.router);
app.use(shop_route);
app.use(err_route);

app.listen(PORT, ()=>console.log("Server started!"));