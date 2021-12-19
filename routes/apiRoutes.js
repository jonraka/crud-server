const express = require('express');
const router = express.Router();

router.get('/users', require('../controllers/getUsers'));
router.get('/user/:userId', require('../controllers/getUser'));
router.post('/users', require('../controllers/addUser'));
router.put('/users', require('../controllers/addUser'));

module.exports = router;
