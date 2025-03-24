const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'giftbasketsecret',
    resave: false,
    saveUninitialized: true
}));

// Load existing users
const loadUsers = () => {
    if (fs.existsSync('users.json')) {
        return JSON.parse(fs.readFileSync('users.json'));
    }
    return [];
};

// Save users
const saveUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Routes

// Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Register
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    let users = loadUsers();

    // Check if user exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
        return res.send('User already exists. Please login.');
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    users.push({ name, email, password: hashedPassword });
    saveUsers(users);

    res.send('Registration successful! <a href="/">Login here</a>');
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.send('User not found. Please register.');
    }

    // Check password
    if (bcrypt.compareSync(password, user.password)) {
        req.session.user = email;
        res.redirect('/home.html');
    } else {
        res.send('Incorrect password.');
    }
});

// Protect Home Page
app.get('/home.html', (req, res, next) => {
    if (req.session.user) {
        next(); // allow access
    } else {
        res.redirect('/');
    }
});

// Logout (optional)
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
