const bcrypt = require('bcrypt');

const comparePassword = (password) => {
    return bcrypt.compare(password)
}

module.exports = {
    comparePassword
}