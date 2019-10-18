const express = require('express');
const bparser = require('body-parser');

const admin_route = require('./Routes/admin');
const shop_route = require('./Routes/shop');
const err_route = require('./Routes/404');

const PORT = 3000;
    
const app = express();

// Use parser

// bparser.urlencoded registers a another middleware
// This object will contain key-value pairs,
// where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bparser.urlencoded({extended:false}));

// Using middleware

// Using routes
app.use("/admin",admin_route);
app.use(shop_route);
app.use(err_route);

app.listen(PORT, ()=>console.log("Server started!"));