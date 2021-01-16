const express = require("express");

const router = express.Router();

const AuthMid = require("../controllers/auth");

router.post("/auth/signup", AuthMid.SignupUser);
router.post("/auth/login", AuthMid.LoginUser);

module.exports = router;
