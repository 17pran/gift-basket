document.addEventListener('DOMContentLoaded', () => {
    function openForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.classList.add('active');
        }
    }

    function closeForms() {
        const popups = document.querySelectorAll('.form-popup');
        popups.forEach(popup => popup.classList.remove('active'));
    }

    document.querySelectorAll('.open-form').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const formId = button.getAttribute('data-form');
            openForm(formId);
        });
    });

    document.querySelectorAll('.close-btn').forEach(button => {
        button.addEventListener('click', closeForms);
    });

    // Fix form submissions by handling by form ID
    const formIds = ['food-form-form', 'clothes-form-form', 'money-form-form'];
    formIds.forEach(id => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const data = new FormData(form);
                const formData = {};
                data.forEach((value, key) => formData[key] = value);

                try {
                    const res = await fetch('/events', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                    });

                    const result = await res.json();
                    if (res.ok) {
                        alert('Event submitted successfully!');
                        form.reset();
                        closeForms();
                    } else {
                        alert('Error: ' + result.message);
                    }
                } catch (err) {
                    console.error('Error submitting event:', err);
                    alert('Submission error. Try again.');
                }
            });
        }
    });
});
