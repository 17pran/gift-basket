const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;

// Dummy in-memory database (You can later replace it with MySQL)
const users = [];

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve CSS, JS, home.html

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session setup
app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
}));

// Routes

// Home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Register page
app.get('/register', (req, res) => {
    res.render('register');
});

// Handle Register
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.redirect('/login');
});

// Login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userEmail = email;
        res.redirect('/');
    } else {
        res.send('Invalid email or password. <a href="/login">Try again</a>');
    }
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
