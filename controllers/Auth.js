const bcrypt = require("bcrypt");
const User = require("../models/User");

//signup router
exports.singup = async (req, res) => {
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
            hashedPassword = await bcrypt.hash(password)
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
