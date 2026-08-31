const User = require("../models/User");

const signup = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already registered"
            });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.status(201).json({
            message: "Signup successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Signup failed",
            error: error.message
        });
    }
};


const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({
            email: email,
            password: password
        });

        if (!user) {

            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({

            message: "Login successful",

            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


module.exports = {
    signup,
    login
};