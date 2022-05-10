const express = require('express');
const router = express.Router();
const user = require('../controllers/user')

router.get('/', (req, res, next) => { user.get(req, res) });

module.exports = router;
