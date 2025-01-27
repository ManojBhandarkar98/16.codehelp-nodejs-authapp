const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require('jsonwebtoken')
require("dotenv").config();

//signup router
exports.signup = async (req, res) => {
    try {
        //get data
        const { name, email, password, role } = req.body;
        //check if user already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'user already Exists'
            })
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password'
            })
        }
        //create entry for user in DB
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: 'User Created successfully'
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, Please try again later'
        })
    }
}

//sign in router
exports.signin = async (req, res) => {
    try {
        //fetch data
        const { email, password } = req.body;
        //validation on email
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please enter all details'
            });
        }
        //check for registered user
        let user = await User.findOne({ email });
        //if user is not registered
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'This email is not register, Please signup'
            });
        }
        //verify password and generate JWT token
        //create payload
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };

        if (await bcrypt.compare(password, user.password)) {
            //password match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                }
            );
            user = user.toObject();
            user.token = token;
            user.password = undefined; //prevent hacking
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully'
            });
        }
        else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: 'Password Incorrect'
            })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Invalid credentials, Please try again later'
        })
    }
}