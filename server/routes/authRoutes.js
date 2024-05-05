const express = require('express');
const cors = require('cors');
const { test, registerUser, loginUser, getID, getUsers } = require('../controllers/authController');
const router = express.Router()

// middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/', test)
router.post('/signup', registerUser)
router.post('/', loginUser)
router.get('/maxUserId', getID)
router.get('/userslist', getUsers)


module.exports = router