document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    // Sidebar Toggle
    menuToggle.addEventListener("click", () => {
        if (navList.style.display === "flex") {
            navList.style.display = "none";
        } else {
            navList.style.display = "flex";
            navList.style.flexDirection = "column";
        }
    });

    // Responsive behavior
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            navList.style.display = "flex";
            navList.style.flexDirection = "row";
        } else {
            navList.style.display = "none";
        }
    });

    // On load, make sure menu behaves correctly
    if (window.innerWidth >= 768) {
        navList.style.display = "flex";
        navList.style.flexDirection = "row";
    }
});
