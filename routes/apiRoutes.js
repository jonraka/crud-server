const express = require('express');
const router = express.Router();

router.post('/users', require('../controllers/addUser'));
router.get('/users', require('../controllers/getUsers'));

module.exports = router;