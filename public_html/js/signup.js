//signup.js
document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const passwordValidations = document.querySelector(".password-validations");
    const passwordErrorFeedback = document.querySelector(".invalid-feedback-password");
    const emailInput = document.getElementById("email");
    const confirmEmailInput = document.getElementById("confirmEmail");
    const form = document.getElementById("signupForm");
    const togglePassword = document.getElementById("togglePassword");
    togglePassword.addEventListener("click", function () {
        const type = password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        this.classList.toggle("fa-eye-slash");
    });

    function validatePassword() {
        const password = passwordInput.value;
        const validations = [];
        if (password.length < 8) {
            validations.push("Password must be at least 8 characters long.");
        }
        if (!/\d/.test(password)) {
            validations.push("Password must contain at least one number.");
        }
        if (!/[A-Z]/.test(password)) {
            validations.push("Password must contain at least one uppercase letter.");
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            validations.push("Password must contain at least one special character.");
        }

        passwordValidations.textContent = validations.join("\n");
        passwordValidations.style.display = validations.length ? "block" : "none";
    }

    function validateEmail() {
        const email = emailInput.value;
        const confirmEmail = confirmEmailInput.value;
        if (email === confirmEmail) {
            emailInput.classList.remove("is-invalid");
            confirmEmailInput.classList.remove("is-invalid");
            emailInput.classList.add("is-valid");
            confirmEmailInput.classList.add("is-valid");
        } else {
            emailInput.classList.remove("is-valid");
            confirmEmailInput.classList.remove("is-valid");
            emailInput.classList.add("is-invalid");
            confirmEmailInput.classList.add("is-invalid");
        }
    }

    function validateInput(input) {
        const errorFeedback = input.parentElement.querySelector(".invalid-feedback");
        if (input.value.trim() === "" && input.required) {
            input.classList.add("is-invalid");
            errorFeedback.textContent = "This field cannot be empty.";
            return false;
        } else {
            input.classList.remove("is-invalid");
            errorFeedback.textContent = ""; // Clear any previous error message
            return true;
        }
    }

    const inputs = form.querySelectorAll("input, select");
    inputs.forEach(function (input) {
        input.addEventListener("input", function () {
            validateInput(input);
        });
    });

    const emailFields = [emailInput, confirmEmailInput];
    emailFields.forEach(function (emailField) {
        emailField.addEventListener("input", function () {
            validateEmail();
        });
    });

    passwordInput.addEventListener("input", function () {
        validatePassword();
    });

    confirmPasswordInput.addEventListener("input", function () {
        const errorFeedback = confirmPasswordInput.parentElement.querySelector(".invalid-feedback");
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add("is-invalid");
            errorFeedback.textContent = "Passwords do not match.";
        } else {
            confirmPasswordInput.classList.remove("is-invalid");
            errorFeedback.textContent = "";
        }
    });

    // Add event listener to the form for submission
    form.addEventListener("submit", function (event) {
        let isValid = true;

        inputs.forEach(function (input) {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        if (emailInput.value !== confirmEmailInput.value) {
            isValid = false;
            emailInput.classList.add("is-invalid");
            confirmEmailInput.classList.add("is-invalid");
            confirmEmailInput.nextElementSibling.textContent = "Emails do not match.";
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            isValid = false;
            passwordInput.classList.add("is-invalid");
            confirmPasswordInput.classList.add("is-invalid");
            passwordErrorFeedback.innerHTML = "<em>Passwords do not match.</em>";
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if any field is invalid
        }
    });
    
});
