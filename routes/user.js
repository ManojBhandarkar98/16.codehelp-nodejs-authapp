const express = require('express')
const router = express.Router();

//import controller
const { signup } = require("../controllers/Auth");

//router.post("/login", login);
router.post("/signup", signup);




module.exports = router;