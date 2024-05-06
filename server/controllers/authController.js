const { response } = require("express");
const User = require("../models/user")
const { hashPassword, comparePassword } = require("../helpers/auth");
const UserModel = require("../models/user");

const test = (req, res) => {
    res.json(`test is working`)
}

// maxIdData Endpoint
const getID = async (req, res) => {
    try {
        // Query MongoDB to find the maximum user ID
        const maxIdUser = await User.findOne({}, {}, { sort: { id: -1 } });
        let maxId = 0;
        if (maxIdUser) {
            maxId = maxIdUser.id;
        }
        // Return the maximum user ID as JSON response
        res.json({ maxId });
    } catch (error) {
        console.error("Error fetching maximum user ID:", error);
    }
}

// Register Endpoint
const registerUser = async (req, res) => {
    try {
        const { id, firstName, lastName, username, email, password, image } = req.body;
        // checks if names were entered
        if (!lastName || !lastName || !username) {
            return res.json({
                error: 'A value is required'
            })
        };
        // check if password is good 
        if (!password || password.length < 6) {
            return ({
                error: "Password is required and should be at least 6 characters long"
            })
        };
        // check email if its unique
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'Email is taken already'
            })
        };

        // create user in database .
        const user = await User.create({
            id,
            firstName,
            lastName,
            username,
            email,
            password,
            image
        })

        return res.json(user)

    } catch (error) {
        console.log(error)
    }
}

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // check if password match
        const match = await comparePassword(password, user.password)
        if (match) {
            res.json('Passwords match')
        }
    } catch (error) {
        console.log(error)
    }
}

// Users Endpoint
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users", error);
        res.json(error);
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getID,
    getUsers
};

