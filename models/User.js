const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    ticketId: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    full_name: {
        type: String,
    },
    choices: {
        type: Array
    }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);