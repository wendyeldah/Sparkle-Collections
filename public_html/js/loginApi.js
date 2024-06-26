document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form data
        const formData = new FormData(loginForm);
        const emailOrUsername = formData.get('emailOrUsername');
        const password = formData.get('password');

        console.log('Sending login request with:', { emailOrUsername, password }); // Log form data

        // Send login request to the server
        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailOrUsername: emailOrUsername,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful login
            if (data.user) {
                // Store user data in localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(data.user));
                
                // Redirect to dashboard after updating UI
                window.location.href = '/index.html';
            }
        })
        .catch(error => {
            // Handle login error
            console.error('There was a problem with the login:', error);
            alert('Login failed. Please try again.'); // Display error message
        });
    });
});
