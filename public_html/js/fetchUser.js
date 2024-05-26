document.addEventListener('DOMContentLoaded', function () {
    // Fetch cart items and other initialization tasks
    fetchCartItems();

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // Update the sign-in link with user information
        const navbar = document.querySelector(".d-flex.justify-content-end.align-items-center");
        navbar.innerHTML = `
        <div class="col-sm-12 col-md-9 text-center text-md-right">
            <div class="d-flex justify-content-end align-items-center">
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Welcome, ${loggedInUser.firstName}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                        <li><a class="dropdown-item" href="#" id="updateProfileLink">Update Profile</a></li>
                        <li><a class="dropdown-item" href="http://localhost:3000/pages/profile-settings.html">Profile Settings</a></li>
                        <li><a class="dropdown-item" href="http://localhost:3000/pages/cart.html">Cart</a></li>
                        <li><a class="dropdown-item" href="#" id="logoutLink">Logout</a></li>
                    </ul>
                </div>
                <a class="nav-link mr-3" href="#" style="font-size: 14px; color: #888;">
                    <i class="bi bi-heart-fill"></i>
                </a>
                <a class="nav-link" href="http://localhost:3000/pages/cart.html" style="font-size: 14px; color: #888;">
                    <i class="bi bi-cart-fill"></i>
                    <span id="cart-item-count" class="badge badge-pill badge-danger"></span>
                </a>
            </div>
        </div>
        `;

        // Event listener for opening the profile update modal
        document.getElementById('updateProfileLink').addEventListener('click', function () {
            // Populate modal with user data
            document.getElementById('firstName').value = loggedInUser.firstName;
            document.getElementById('lastName').value = loggedInUser.lastName;
            document.getElementById('address').value = loggedInUser.address;
            document.getElementById('city').value = loggedInUser.city;
            document.getElementById('state').value = loggedInUser.state;
            document.getElementById('zipCode').value = loggedInUser.zipCode;
            document.getElementById('phone').value = loggedInUser.phone;

            // Show the modal
            const updateProfileModal = new bootstrap.Modal(document.getElementById('updateProfileModal'));
            updateProfileModal.show();
        });

        // Event listener for logout
        document.getElementById('logoutLink').addEventListener('click', function () {
            // Handle logout
            localStorage.removeItem('loggedInUser');
            window.location.href = '/'; // Redirect to home page or login page
        });

        // Event listener for profile update form submission
        document.getElementById('updateProfileForm').addEventListener('submit', function (event) {
            event.preventDefault();

            // Gather updated data
            const updatedUserData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zipCode: document.getElementById('zipCode').value,
                phone: document.getElementById('phone').value
            };
            // Send updated data to server (assuming this part is correctly implemented)
            fetch(`/api/users/${loggedInUser._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUserData)
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Update local storage and UI
                    localStorage.setItem('loggedInUser', JSON.stringify({ ...loggedInUser, ...updatedUserData }));
                    alert('Profile updated successfully');
                    window.location.href = '/'; // Redirect to home page or login page

                } else {
                    alert('Failed to update profile');
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('An error occurred while updating the profile');
            });
        });
    }
});



function fetchCartItems() {
    fetch('/api/cart')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(cartData => {
        return fetch('/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(productData => {
                const cartItems = cartData.cartItems.map(cartItem => {
                    const product = productData.find(product => product._id === cartItem.productId);
                    if (product) {
                        return {
                            ...cartItem,
                            productName: product.name,
                            price: product.current_price,
                            image: product.images[0]
                        };
                    } else {
                        console.log(`Product with ID ${cartItem.productId} not found.`);
                        return {
                            ...cartItem,
                            productName: 'Product Not Found',
                            price: 0,
                            image: ''
                        };
                    }
                });
                return cartItems;
            });
    })
    .then(cartItems => {
        const totalItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const cartItemCountBadge = document.getElementById('cart-item-count');
        cartItemCountBadge.textContent = totalItemCount;
        console.log(totalItemCount)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
