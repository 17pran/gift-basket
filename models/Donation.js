const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
    donationType: { type: String, enum: ['money', 'food', 'clothes'], required: true },
    amount: { type: Number, required: false },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
