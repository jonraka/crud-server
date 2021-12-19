const express = require('express');
const router = express.Router();

router.get('/users/:userId?', require('../controllers/getUsers'));
router.delete('/users', require('../controllers/deleteUser'));
router.post('/users', require('../controllers/addUser'));
router.put('/users', require('../controllers/updateUser'));

module.exports = router;
