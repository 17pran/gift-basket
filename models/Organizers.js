const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'NGO', required: true },
    organizerName: { type: String, required: true },
    organizerEmail: { type: String, unique: true, required: true },
    organizerPhone: { type: String },
});

const Organizers = mongoose.model('Organizers', organizerSchema);
module.exports = Organizers;
