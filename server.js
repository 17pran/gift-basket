const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static frontend files

const USERS_FILE = path.join(__dirname, 'users.json');

// Nodemailer transporter setup (if used later)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,   // Your email (from .env)
        pass: process.env.EMAIL_PASS,   // Your app password (from .env)
    },
});

// REGISTER Route (simulated, saves to users.json)
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log('📥 Register request received:', req.body);

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading users file:', err);
            return res.status(500).send('Error reading users database.');
        }

        const users = JSON.parse(data || '[]');

        if (users.some(user => user.email === email)) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        const newUser = { name, email, password };
        users.push(newUser);

        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('❌ Error saving user:', writeErr);
                return res.status(500).send('Error saving user.');
            }

            console.log('✅ User registered:', newUser);
            res.json({ success: true, message: 'Registration successful!' });
        });
    });
});

// LOGIN Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for:', email);

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ Error reading users file:', err);
            return res.status(500).send('Error reading users database.');
        }

        const users = JSON.parse(data || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            // User not found, inform them to register first
            console.log(`❌ No such user with email: ${email}`);
            return res.status(400).json({
                success: false,
                message: 'User not found. Please register first.',
            });
        }

        const loginTime = new Date().toLocaleString();
        console.log(`✅ User Logged In: ${user.name} (${email}) at ${loginTime}`);
        res.json({ success: true, message: 'Login successful!' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
