document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    // Register Button Click Event
    const registerButton = document.getElementById('register-btn');
    registerButton.addEventListener('click', () => {
        loginForm.style.display = 'none';  // Hide the login form
        registerForm.style.display = 'block';  // Show the register form
    });

    // Optionally, add a "Back to Login" button inside the register form
    const backToLoginButton = document.createElement("button");
    backToLoginButton.textContent = "Back to Login";
    backToLoginButton.addEventListener("click", () => {
        registerForm.style.display = 'none';  // Hide the register form
        loginForm.style.display = 'block';  // Show the login form
    });

    // Add this "Back to Login" button to the register form
    registerForm.appendChild(backToLoginButton);

    // Register Form Handling
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = registerForm.querySelector('input[name="name"]').value.trim();
        const email = registerForm.querySelector('input[name="email"]').value.trim();
        const password = registerForm.querySelector('input[name="password"]').value.trim();

        if (email && password && name) {
            fetch('/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Registration successful! You can now login.");
                        registerForm.reset();
                        loginForm.style.display = 'block';
                        registerForm.style.display = 'none';
                    } else {
                        alert("Registration failed. Try again.");
                    }
                })
                .catch(err => console.error('Error:', err));
        } else {
            alert("Please fill all fields.");
        }
    });

    // Login Form Handling
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[name="email"]').value.trim();
        const password = loginForm.querySelector('input[name="password"]').value.trim();

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Login successful!");
                    window.location.href = "home.html";  // Redirect after successful login
                } else {
                    if (data.message === 'User not found. Please register first.') {
                        alert("User not found. Please register first.");
                    } else {
                        alert("Invalid credentials. Please try again.");
                    }
                }
            })
            .catch(err => console.error('Error:', err));
    });
});
