const express = require('express');
const router = express.Router();

const {_add_product} = require('../util/path');

// Triggers only for GET method
router.get("/add-product", (req, res, next) => {
    res.sendFile(_add_product);
})

// Triggers only for POST method
router.post("/add-product", (req, res, next) => {
    console.log(req.body.title);
    res.redirect("/");
})

module.exports = router;