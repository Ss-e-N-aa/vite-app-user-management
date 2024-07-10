const User = require("../models/user");

// UsersList Endpoint with filter and pagination support
const getUsersList = async (req, res) => {
    try {
        const { q, page = 1, limit = 8 } = req.query;
        const skip = (page - 1) * limit;
        const searchKeys = ['firstName', 'lastName', 'email'];

        // Find users first then filter 
        let users = await User.find();
        if (q) {
            users = users.filter(user =>
                searchKeys.some(key => user[key].toLowerCase().includes(q))
            );
        }

        // Pagination
        const totalUsers = users.length;
        const filteredUsers = users.slice(skip, skip + Number(limit));
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            users: filteredUsers,
            totalPages,
            currentPage: Number(page),
            totalUsers
        });
    } catch (error) {
        console.error("Error fetching users", error);
    }
};



module.exports = { getUsersList };
