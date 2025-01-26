const express = require('express')
const router = express.Router();

//import controller
const { signup, signin } = require("../controllers/Auth");

router.post("/login", signin);
router.post("/signup", signup);




module.exports = router;