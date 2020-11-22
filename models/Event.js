const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    date: {
        type: Datetime,
        required: true
    },
    event_id: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

module.exports = User = mongoose.model('Event', EventSchema);