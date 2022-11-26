const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/new', userController.createUser, (req, res) => res.status(200).send('user created'));

router.post('/login', userController.login, (req, res) => res.status(200).send('logged in'));

module.exports = router;
