const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Models
const Member = require('./models/Member');
const Donation = require('./models/Donation');
const Events = require('./models/Events');
const NGOs = require('./models/NGOs');
const Organizers = require('./models/Organizers');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static frontend files

// Connect to MongoDB (only once)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,   // Your email (from .env)
        pass: process.env.EMAIL_PASS,   // Your app password (from .env)
    },
});

// REGISTER Route (using MongoDB instead of users.json)
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('📥 Register request received:', req.body);

    try {
        // Check if user already exists
        const userExists = await Member.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Member({ name, email, password: hashedPassword });

        // Save the new user to MongoDB
        await newUser.save();

        // Debugging: Log the saved user to see if it worked
        console.log('✅ User registered and saved:', newUser);

        res.json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        console.error('❌ Error registering user:', err);
        res.status(500).send('Error registering user.');
    }
});


// LOGIN Route (using MongoDB instead of users.json)
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

        // Compare the password with the hashed one in the database
        const isMatch = await bcrypt.compare(password, member.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password.',
            });
        }

        // Generate JWT token on successful login
        const token = jwt.sign({ memberId: member._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const loginTime = new Date().toLocaleString();
        console.log(`✅ Member Logged In: ${member.name} (${email}) at ${loginTime}`);
        res.json({ success: true, message: 'Login successful!', token });
    } catch (err) {
        console.error('❌ Error during login:', err);
        res.status(500).send('Error during login.');
    }
});

// Sample route to send email (for verification or notification)
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

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
