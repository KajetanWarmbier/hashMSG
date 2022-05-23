const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

const User = require('../models/user');

router.post('/signup', UserController.user_sign_up);

router.post('/login', UserController.user_login);

router.post('/addfriend', UserController.user_add_friend);

module.exports = router;
