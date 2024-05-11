document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch user information from the backend
    function fetchUserData() {
      fetch("/api/users/data") // Adjust the endpoint to match the backend route
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          // Log user data
          console.log("User data:", data);
  
          // Handle user data
          if (data.user) {
            // If user data is present, update the navbar
            const navbar = document.querySelector(".first-navbar");
            navbar.innerHTML = `
              <div class="d-flex justify-content-between align-items-center">
                <!-- Logo -->
                <a class="navbar-brand" href="#" style="font-size: 30px; color: #888;">Sparkle Collections</a>
  
                <!-- Welcome message and dropdown menu -->
                <div class="d-flex align-items-center">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Welcome, ${data.user.firstName}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="#">Update Profile</a>
                      <a class="dropdown-item" href="#">Profile Settings</a>
                      <a class="dropdown-item" href="#">Cart</a>
                      <a class="dropdown-item" href="#">Logout</a>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  
    // Call fetchUserData function to fetch user information when the page loads
    fetchUserData();
  
    // Add your existing event listeners and functions below...
  });
