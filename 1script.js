document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    menuToggle.addEventListener("click", () => {
        if (navList.style.display === "flex") {
            navList.style.display = "none";
        } else {
            navList.style.display = "flex";
            navList.style.flexDirection = "column";
        }
    });

    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    const header = document.querySelector("header");

    if (!userEmail) {
        // Not logged in, redirect to login
        alert("Please login first!");
        window.location.href = "index.html"; // Redirect to login
    } else {
        // Display user email on header
        const welcomeMsg = document.createElement("p");
        welcomeMsg.textContent = `Logged in as: ${userEmail}`;
        welcomeMsg.style.marginTop = "10px";
        welcomeMsg.style.fontSize = "1rem";
        welcomeMsg.style.color = "#ccc";
        header.appendChild(welcomeMsg);
    }

    // Menu card click actions
    const menuCards = document.querySelectorAll(".menu-card");
    menuCards.forEach(card => {
        card.addEventListener("click", () => {
            const action = card.textContent.trim();

            if (action === "Logout") {
                localStorage.removeItem("userEmail");
                alert("You have been logged out!");
                window.location.href = "index.html";
            } else {
                alert(`You clicked: ${action}`);
                // Example: window.location.href = "donate.html";
            }
        });
    });
});
