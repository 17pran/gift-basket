document.addEventListener("DOMContentLoaded", function () {
    const menuCards = document.querySelectorAll(".menu-card");

    menuCards.forEach(card => {
        card.addEventListener("click", function () {
            if (this.textContent.toLowerCase() === "logout") {
                fetch('/logout', { method: 'GET' }) // Call logout API
                    .then(() => window.location.href = "/") // Redirect to home
                    .catch(err => console.error("Logout error:", err));
            } else {
                const page = this.textContent.toLowerCase() + ".html";
                window.location.href = page;
            }
        });
    });
});
