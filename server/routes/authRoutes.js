const express = require('express');
const cors = require('cors');
const { loginUser, logoutUser, updateUser, getUserById, deleteUserById, getID, getProfile } = require('../controllers/userAuth')
const { registerUser } = require('../controllers/registerAuth')
const { getUsersList } = require('../controllers/usersListAuth')
const router = express.Router()

const test = (req, res) => {
    res.json(`test is working`)
}

// middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

// GET request
router.get('/', test)
router.get('/maxUserId', getID)
router.get('/userslist', getUsersList)
router.get('/profile', getProfile)
router.get('/users/:id', getUserById);

// POST request
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

// PUT request for updating user data - unused atm
router.put('/users/:id', updateUser);

// DELETE request 
router.delete('/users/:id', deleteUserById)

module.exports = router