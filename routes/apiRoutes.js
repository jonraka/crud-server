const express = require('express');
const router = express.Router();

router.get('/users/add', require('../controllers/addUser'));
router.get('/users', require('../controllers/getUsers'));

module.exports = router;