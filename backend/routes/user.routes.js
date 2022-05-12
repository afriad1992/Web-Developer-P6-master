const express = require('express');
const router = express.Router();

const AuthCtlr = require('../controllers/user.controller');

router.post('/signup', AuthCtlr.signup);
router.post('/login', AuthCtlr.login);

module.exports = router;