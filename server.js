const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serving static files

const USERS_FILE = path.join(__dirname, 'users.json'); // File path

// ----- REGISTER ROUTE -----
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const newUser = { name, email, password };

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users.json');
        }
        let users = JSON.parse(data || '[]'); // Parse data, handle empty file

        // Check if email already exists
        const exists = users.find(u => u.email === email);
        if (exists) {
            return res.send('User already exists. Please login.');
        }

        users.push(newUser); // Add new user

        // Save back
        fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving user');
            console.log('User Registered!');
            res.send('<h2>Registration successful! <a href="/">Go Back</a></h2>');
        });
    });
});

// ----- LOGIN ROUTE -----
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(USERS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading users.json');
        }
        let users = JSON.parse(data || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            res.send('<h2>Login successful! <a href="/">Go to Home</a></h2>');
        } else {
            res.send('<h2>Login failed! <a href="/">Try Again</a></h2>');
        }
    });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
