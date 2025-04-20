const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    location: String,
    // Add this if it's missing
    participants: [
        {
            name: String,
            email: String,
            message: String
        }
    ]
});

const Events = mongoose.model('Events', eventSchema);
module.exports = Events;
