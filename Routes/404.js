const express = require('express');
const router = express.Router();

const {_not_found} = require('../util/path');

router.use((req, res, next) => {
    res.render('404', {pageTitle: 'Page not found!', path: ""});
})

module.exports = router;