const express = require('express');
const bparser = require('body-parser');

const root_route = require('./routes/index');
const admin_route = require('./routes/admin');
const shop_route = require('./routes/shop');
// const err_route = require('./routes/404');

const {connect} = require('./util/db-connect');
const User = require('./models/user');

const { _public } = require('./util/path');

const PORT = 3000;

const app = express();

// Set Templating engine and views folder
app.set('view engine', 'ejs');
// Not required as 'views' is the default value set by express
app.set('views', 'views');

// Use parser

// bparser.urlencoded registers a another middleware
// This object will contain key-value pairs,
// where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bparser.urlencoded({ extended: false }));

// Using middleware

// Using routes
app.use(express.static(_public));

// Set a user since no auth yet
app.use((req, res, next) => {
    User.findById("5dbb8d0372ecf12450866af1")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err=>console.log(err));
})


app.use(root_route);
app.use("/admin", admin_route);
app.use(shop_route);
// app.use(err_route);

connect()
    .then(() => {
        app.listen(PORT, () => console.log("Server started!"));
    })
    .catch(err=> err ? console.log(err): null);
