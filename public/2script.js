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

    // Reset nav display on window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
            navList.style.display = "flex";
            navList.style.flexDirection = "row";
        } else {
            navList.style.display = "none";
        }
    });

    // Event Button Alerts
    const foodBtn = document.getElementById("join-food");
    const clothesBtn = document.getElementById("donate-clothes");
    const moneyBtn = document.getElementById("donate-money");

    foodBtn.addEventListener("click", () => {
        alert("Thank you for joining the Food Drive!");
    });

    clothesBtn.addEventListener("click", () => {
        alert("Thank you for donating clothes!");
    });

    moneyBtn.addEventListener("click", () => {
        alert("Thank you for supporting with monetary donation!");
    });
});
