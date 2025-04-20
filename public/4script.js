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
            navList.style.flexDirection = "row"; // Ensure row direction on wider screens
        } else {
            navList.style.display = "none";
        }
    });

    const donationForm = document.querySelector('.donation-form');
    donationForm.addEventListener('submit', async (e) => {
        e.preventDefault();  // Prevent form from submitting normally

        // Get form data
        const formData = new FormData(donationForm);
        const data = {
            name: formData.get('name'),
            donationType: formData.get('donationType'),
            amount: formData.get('amount')
        };

        try {
            const response = await fetch('/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Thank you for your generous donation!');
                donationForm.reset(); // Reset form fields
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('There was an issue with the donation submission.');
        }
    });

});
