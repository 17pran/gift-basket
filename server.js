const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

// Models
const Member = require('./models/Member');
const Donation = require('./models/Donation'); // Added Donation Model
const Events = require('./models/Events');
const NGOs = require('./models/NGOs');
const Organizers = require('./models/Organizers');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Register
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('📥 Register request received:', req.body); // Log the incoming data

    try {
        // Check if user already exists
        const userExists = await Member.findOne({ email });
        if (userExists) {
            console.log('❌ User already exists');
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Member({ name, email, password: hashedPassword });
        await newUser.save();
        console.log('✅ User registered:', newUser);

        // Send success response
        res.json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        console.error('❌ Error during registration:', err);  // Log the error
        res.status(500).json({ success: false, message: 'Error registering user.' });
    }
});


// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for:', email);

    try {
        const member = await Member.findOne({ email });
        if (!member) {
            return res.status(400).json({
                success: false,
                message: 'Member not found. Please register first.',
            });
        }

        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password.',
            });
        }

        const token = jwt.sign({ memberId: member._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const loginTime = new Date().toLocaleString();
        console.log(`✅ Member Logged In: ${member.name} (${email}) at ${loginTime}`);
        res.json({ success: true, message: 'Login successful!', token });
    } catch (err) {
        console.error('❌ Error during login:', err);
        res.status(500).send('Error during login.');
    }
});

// Send Email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('❌ Error sending email:', err);
            return res.status(500).send('Error sending email.');
        }
        console.log('✅ Email sent:', info.response);
        res.json({ success: true, message: 'Email sent successfully!' });
    });
});

// Add Event
app.post('/events', async (req, res) => {
    const { ngoId, eventName, eventDate } = req.body;
    console.log('📥 Event submission received:', req.body);

    try {
        const newEvent = new Events({ ngoId, eventName, eventDate });
        const savedEvent = await newEvent.save();
        console.log('✅ Event saved:', savedEvent);

        res.json({ success: true, message: 'Event created successfully!', event: savedEvent });
    } catch (error) {
        console.error('❌ Error saving event:', error);
        res.status(500).json({ success: false, message: 'Error saving event to database.' });
    }
});

// Add Donation (NEW ROUTE)
app.post('/donate', async (req, res) => {
    const { name, donationType, amount } = req.body;
    console.log('📥 Donation submission received:', req.body);

    try {
        const newDonation = new Donation({
            name,
            donationType,
            amount
        });

        const savedDonation = await newDonation.save();
        console.log('✅ Donation saved:', savedDonation);

        res.json({ success: true, message: 'Donation received and saved!', donation: savedDonation });
    } catch (error) {
        console.error('❌ Error saving donation:', error);
        res.status(500).json({ success: false, message: 'Error saving donation to database.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
