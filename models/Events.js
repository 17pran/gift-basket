const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
    eventName: { type: String, required: true },
    eventDate: { type: Date },
    eventLocation: { type: String },
    eventDescription: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Events = mongoose.model('Events', eventSchema);
module.exports = Events;
