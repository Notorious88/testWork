const express = require('express');
const router = express.Router();
const passport = require("passport")


const userControl = require("./controller/userControl")

router.post("/create", userControl.user_create);

router.post("/login",
    passport.authenticate('local'),
    userControl.user_login);

router.get('/logout', userControl.logout);

module.exports = router;