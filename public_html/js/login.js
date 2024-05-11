const togglePassword = document.getElementById("togglePassword");
togglePassword.addEventListener("click", function () {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
});

// Form validation
function validateLoginForm(event) {
    event.preventDefault();
    const emailOrUsername = document.getElementById('emailOrUsername').value;
    const password = document.getElementById('password').value;
    const emailOrUsernameError = document.getElementById('emailOrUsernameError');
    const passwordError = document.getElementById('passwordError');

    // Reset previous error messages
    emailOrUsernameError.textContent = '';
    passwordError.textContent = '';

    let isValid = true;

    // Validate email/username
    if (!emailOrUsername.trim()) {
        emailOrUsernameError.textContent = 'Email address or username is required';
        isValid = false;
    }

    // Validate password
    if (!password.trim()) {
        passwordError.textContent = 'Password is required';
        isValid = false;
    }

    return isValid;
}

// Prevent form submission if validation fails
document.getElementById('loginForm').addEventListener('submit', function (event) {
    if (!validateLoginForm()) {
        event.preventDefault();
    }
});