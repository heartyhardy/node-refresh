const express = require('express');
const router = express.Router();

const {_not_found} = require('../util/path');

router.use((req, res, next) => {
    res.status(404).sendFile(_not_found);
})

module.exports = router;