document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(form);
        const userData = {};
        formData.forEach((value, key) => {
            // Convert "on" to true for subscribe field
            if (key === 'subscribe') {
                userData[key] = value === 'on'; // Convert "on" to true
            } else {
                userData[key] = value;
            }
        });

        try {
            // Make POST request to signup endpoint
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();

            if (response.ok) {
                // Signup successful
                alert('Signup successful! Proceed to login.');
                // Redirect to login page after 2 seconds
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 2000);
            } else {
                // Signup failed, display error message
                alert(responseData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            // Display generic error message
            alert('Something went wrong. Please try again later.');
        }
    });
});
