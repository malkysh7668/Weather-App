const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        minlength: 6,
    },
    pass: {
        type: String,
        minlength: 6,
    }
})
module.exports = mongoose.model('User', userSchema);