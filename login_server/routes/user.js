const express = require("express");

const router = express.Router();

const UserMid = require("../controllers/user");

router.post("/user/getUser", UserMid.getUser);

module.exports = router;
