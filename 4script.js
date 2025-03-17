document.addEventListener("DOMContentLoaded", () => {

    // Toggle Sidebar Menu
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

    // Reset nav display on resize
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            navList.style.display = "flex";
            navList.style.flexDirection = "row";
        } else {
            navList.style.display = "none";
        }
    });

    // Donation form handling
    const donationForm = document.querySelector('.donation-form');
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your generous donation!');
        donationForm.reset();
    });

});
