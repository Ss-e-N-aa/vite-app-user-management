const User = require("../models/user")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

// maxIdData Endpoint, // find the maximum user ID from mongoDB
const getID = async (req, res) => {
    try {
        const maxIdUser = await User.findOne({}, {}, { sort: { id: -1 } });
        let maxId = 0;
        if (maxIdUser) {
            maxId = maxIdUser.id;
        }

        res.json({ maxId });
    } catch (error) {
        console.error("Error fetching maximum user ID:", error);
    }
}

// getProfile Endpoint , token with user info
const getProfile = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.json({
                error: 'An email is required'
            })
        };

        if (!password) {
            return res.json({
                error: "A password is required"
            })
        };

        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            })
        }

        // check if passwords match then create a token 
        const comparePassword = (inputPassword, storedPassword) => {
            return inputPassword === storedPassword;
        };
        const match = comparePassword(password, user.password);

        if (match) {
            jwt.sign({
                id: user.id,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email,
                password: user.password
            },
                process.env.JWT_SECRET, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json({ user })
                })
        } else {
            return res.json({
                error: "Incorrect password"
            });
        }
    } catch (error) {
        console.log(error)
    }
}

// Logout Endpoint , clear cookie/token on exit
const logoutUser = (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error)
    }
};

// on a side note , i think the updated data needs some auth checks as well, like : new password must be different and length check...etc 
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from URL params
        const updatedData = req.body; // Get updated user data from request body
        console.log(`Received user ID: ${id}`); // Debugging line
        console.log('Updated Data:', updatedData); // Debugging line

        // Find user by id field and update with new data
        const updatedUser = await User.findOneAndUpdate({ id }, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.json(updatedUser); // Send back the updated user data
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).send("Error updating user");
    }
};

// get user by ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ id });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching user", error);
        res.status(500).send("Error fetching user");
    }
};

// delete user by id
const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ id });

        if (!user) {
            return res.status(404).send("User not found");
        }

        await User.findOneAndDelete({ id });

        const response = {
            message: "User successfully deleted",
            id: user.id
        };
        return res.status(200).send(response);

    } catch (error) {
        console.error("Error deleting user", error);
        return res.status(500).send("Internal Server Error");
    }
};


module.exports = { loginUser, logoutUser, updateUser, getUserById, deleteUserById, getID, getProfile };
