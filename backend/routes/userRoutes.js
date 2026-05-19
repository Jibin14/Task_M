const express = require('express');
const {userAuthentication } = require('../middleware/authentication');
const { userRegistration, userLogin, logoutUser } = require('../controllers/userControll');
const router = express.Router();


router.route('/register').post(userRegistration);
router.route('/login').post(userLogin);
router.route('/logout').post(userAuthentication,logoutUser);

module.exports = router;