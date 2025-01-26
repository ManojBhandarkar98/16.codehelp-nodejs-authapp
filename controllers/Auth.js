const bcrypt = require("bcrypt");
const User = require("../models/User");

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
            hashedPassword = await bcrypt.hash(password, 10)
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
        const validateEmail = await User.findOne({ email });
        //if user is not registered
        if (!validateEmail) {
            return res.status(401).json({
                success: false,
                message: 'This email is not register, Please signup'
            });
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