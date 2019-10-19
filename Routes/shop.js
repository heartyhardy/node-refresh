const express = require('express');
const router = express.Router();

const {_shop} = require('../util/path');

router.use((req, res, next) => {
    console.log("Processing a new request");
    next();
})

router.get("/", (req, res, next) => {
    res.sendFile(_shop);
})

module.exports = router;