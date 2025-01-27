const express = require('express')
const router = express.Router();

//import controller
const { signup, signin } = require("../controllers/Auth");
//midleware get
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login", signin);
router.post("/signup", signup);

//Testing protected route for single middleware
router.get("/test", auth, (req,res)=>{
    res.json({
        sucess:true,
        message:"Welcome to the protect route for test"
    });
})

//protected route means role wise
router.get("/student", auth,isStudent, (req,res)=>{
    res.json({
        sucess:true,
        message:"Welcome to the protect route for student"
    });
})
router.get("/admin", auth,isStudent, (req,res)=>{
    res.json({
        sucess:true,
        message:"Welcome to the protect route for Admin"
    });
});

module.exports = router;