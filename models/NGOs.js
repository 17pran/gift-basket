const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const NGOs = mongoose.model('NGOs', ngoSchema);
module.exports = NGOs;
