// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    // Initially hide nav on small screens
    if (window.innerWidth < 768) {
        navList.style.display = "none";
    }

    // Toggle nav display when menu button is clicked
    menuToggle.addEventListener("click", () => {
        if (navList.style.display === "flex") {
            navList.style.display = "none";
        } else {
            navList.style.display = "flex";
            navList.style.flexDirection = "column"; // Stack vertically on small screens
            navList.style.gap = "10px";
            navList.style.marginTop = "10px";
        }
    });

    // Optional: Hide nav again when window resized to large
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            navList.style.display = "flex";
            navList.style.flexDirection = "row";
            navList.style.gap = "20px";
            navList.style.marginTop = "0";
        } else {
            navList.style.display = "none";
        }
    });
});
