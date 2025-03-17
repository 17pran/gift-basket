document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Simulate login success
        window.location.href = "home.html"; // Redirect to home page
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Simulate register success
        window.location.href = "home.html"; // Redirect to home page
    });
});
