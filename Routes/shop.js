const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log("Processing a new request");
    next();
})

router.get("/", (req, res, next) => {
    res.send("<h1>Hello from Express!</h1>");
})

module.exports = router;