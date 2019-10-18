const express = require('express');
const router = express.Router();

// Triggers only for GET method
router.get("/add-product", (req, res, next) => {
    res.send("<h1>Add a new product</h1><br /><form action='/admin/add-product' method='POST'><input type='text' name='prodname' /><button type='submit'>Add</button></form>");
})

// Triggers only for POST method
router.post("/add-product", (req, res, next) => {
    console.log(req.body.prodname);
    res.redirect("/");
})

module.exports = router;