//auth, isStudent, isAdmin
const jwt = require('jsonwebtoken');
require("dotenv").config();
//Authentication
exports.auth = (req, res, next) => {
    try {
        //extract JWT token
        //other way to fetch token
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        console.log("header", req.header("Authorization"));
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }
        //verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;

        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            });

        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying token"
        });
    }
}
//Authorization
exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Student"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not match"
        });
    }
}
//Authorization
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not match"
        });
    }
}