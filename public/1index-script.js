document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    // Register Form Handling
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = registerForm.querySelector('input[type="text"]').value.trim();
        const email = registerForm.querySelector('input[type="email"]').value.trim();
        const password = registerForm.querySelector('input[type="password"]').value.trim();

        if (email && password) {
            // Save to localStorage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            alert("Registration successful! You can now login.");
            registerForm.reset();
        } else {
            alert("Please fill all fields.");
        }
    });

    // Login Form Handling
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value.trim();
        const password = loginForm.querySelector('input[type="password"]').value.trim();

        const savedEmail = localStorage.getItem("userEmail");
        const savedPassword = localStorage.getItem("userPassword");

        if (email === savedEmail && password === savedPassword) {
            alert("Login successful! Redirecting...");
            // You can redirect to home page or any page
            window.location.href = "home.html";
        } else {
            alert("Invalid credentials. Please register first or try again.");
        }
    });
});
