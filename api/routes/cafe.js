var express = require('express');
var router = express.Router();

const db = require('./queries')
router.get('/', db.getCafes)
router.get('/:id', db.getCafeById)
router.post('/', db.createCafe)
router.delete('/:id', db.deleteCafe)

module.exports = router;
