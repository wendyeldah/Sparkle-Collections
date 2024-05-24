// Function to display loading animation or placeholder cards
function displayLoadingAnimation(container) {
    // Clear previous products
    container.innerHTML = '';

    // Display loading animation or placeholder cards
    for (let i = 0; i < 6; i++) { // Display 6 placeholder cards
        const loadingCard = createLoadingCard();
        container.appendChild(loadingCard);
    }
}

// Function to create a loading card
function createLoadingCard() {
    const loadingCard = document.createElement('div');
    loadingCard.classList.add('col-lg-2', 'col-md-3', 'col-sm-6', 'mb-4', 'product-card', 'position-relative', 'overflow-hidden');

    // Set inner HTML for the loading card
    loadingCard.innerHTML = `
        <div class="card">
            <div class="card-header position-relative">
                <div class="loading-placeholder loading-placeholder-header"></div>
            </div>
            <div class="card-body">
                <div class="loading-placeholder loading-placeholder-title"></div>
                <div class="loading-placeholder loading-placeholder-text"></div>
                <div class="loading-placeholder loading-placeholder-text"></div>
                <div class="loading-placeholder loading-placeholder-text"></div>
            </div>
        </div>
    `;

    return loadingCard;
}

// Function to fetch and display filtered products
function fetchAndDisplayFilteredProducts() {
    // Get all checked checkboxes under Categories
    const categoryCheckboxes = document.querySelectorAll('#categoriesSubcategories input[type="checkbox"]:checked');

    // Get the products container for filtered products
    const productsContainer = document.getElementById('filtered-products');

    // Display loading animation or placeholder cards
    displayLoadingAnimation(productsContainer);

    // Simulate loading with a 3-second delay
    setTimeout(() => {
        // Clear previous products
        productsContainer.innerHTML = '';

        // Fetch products from the API
        fetch('http://localhost:3000/api/products/')
            .then(response => response.json())
            .then(products => {
                // Add header for filtered products
                const filteredProductsHeader = document.getElementById('filtered-products-header');
                filteredProductsHeader.style.display = 'none'; // Hide the filter header initially

                // Iterate through each product
                products.forEach(product => {
                    // Check if the product category matches any of the selected categories
                    const matchesCategory = Array.from(categoryCheckboxes).some(checkbox => {
                        return product.category === checkbox.value;
                    });

                    // If the product matches any selected category, create and append the product card
                    if (matchesCategory) {
                        const productCard = createProductCard(product);
                        productsContainer.appendChild(productCard);

                        // Show the filter header if there are filtered products
                        filteredProductsHeader.style.display = 'block';
                    }
                });

                // Update category counts
                updateCategoryCounts(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, 3000); // 3-second delay
}

// Function to fetch and display all products
function fetchAndDisplayAllProducts() {
    // Get the products container for all products
    const productsContainer = document.getElementById('products');

    // Display loading animation or placeholder cards
    displayLoadingAnimation(productsContainer);

    // Simulate loading with a 3-second delay
    setTimeout(() => {
        // Fetch products from the API
        fetch('http://localhost:3000/api/products/')
            .then(response => response.json())
            .then(products => {
                // Clear previous products
                productsContainer.innerHTML = '';

                // Iterate through each product
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    productsContainer.appendChild(productCard);
                });

                // Update category counts
                updateCategoryCounts(products);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, 1000); // 3-second delay
}

// Function to create a product card
function createProductCard(product) {

    const productCard = document.createElement('div');
    productCard.classList.add('col-lg-2', 'col-md-3', 'col-sm-6', 'mb-4', 'product-card', 'position-relative', 'overflow-hidden');

    // Set inner HTML for the product card
    productCard.innerHTML = `
        <div class="card">
            <div class="card-header position-relative">
                <img src="${product.images[0]}" class="card-img-top" alt="Product Image" style="height:150px;">
                <button class="quick-view-btn" data-product-id="${product._id}">
                    <i class="bi bi-eye"></i> Quick View
                </button>
            </div>
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text overflow-hidden">${product.description}</p>
                <div class="price-section">
                    <p class="previous-price">$${product.previous_price}</p>
                    <p class="current-price">Now $${product.current_price}</p>
                </div>
                <div class="text-center">
                    <a href="#" class="btn btn-primary w-100 add-to-cart-btn">Add to Cart</a>
                </div>
            </div>
        </div>
    `;

    // Add event listener to the "Quick View" button
    const quickViewBtn = productCard.querySelector('.quick-view-btn');
    quickViewBtn.addEventListener('click', () => {
        // Retrieve the product ID
        const productId = product._id;

        // Redirect to the single product page with the product ID appended to the URL
        window.location.href = `http://localhost:3000/pages/singleProduct.html?id=${productId}`;
    });

    // Add event listener to the "Add to Cart" button
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        // Retrieve the product ID
        const productId = product._id;

        // Construct the payload for the POST request
        const payload = {
            productId: productId,
            quantity: 1
        };

        // Send the POST request to add the product to the cart
        fetch('http://localhost:3000/api/cart/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                // Display the modal for further actions
                showCartModal();
            })
            .catch(error => {
                console.error('Error adding product to cart:', error);
            });
    });

    return productCard;
}

// Function to display the cart modal
function showCartModal() {
    const modalHtml = `
    <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="cartModalLabel">Success!</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span                aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    You have successfully added the product to the cart. What would you like to do next?
                </div>
                <div class="modal-footer d-flex flex-column">
                    <div class="mb-2 w-100">
                        <button id="btn-continue" type="button" class="btn btn-primary w-100 " data-dismiss="modal" style="padding: 10px; background-color: black; font-size: 18px; color: white; border: black;">Continue Shopping</button>
                    </div>
                    <div class="w-100">
                        <a href="http://localhost:3000/pages/cart.html">
                            <button id="btn-checkout" class="btn btn-primary w-100" style="background-color: white; font-size: 18px; color: black; border: 1px solid black">Proceed to Checkout</button>
                        </a> 
                    </div>
                </div>
            </div>
            </div>
        </div>
    
        `;

    // Append the modal HTML to the body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show the modal
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Function to update category counts
function updateCategoryCounts(products) {
    const categoryCounts = {};

    // Count products for each category
    products.forEach(product => {
        if (categoryCounts[product.category]) {
            categoryCounts[product.category]++;
        } else {
            categoryCounts[product.category] = 1;
        }
    });

    // Update counts in the DOM
    Object.entries(categoryCounts).forEach(([category, count]) => {
        const countSpan = document.querySelector(`#categoriesSubcategories input[value="${category}"] + span#count`);
        if (countSpan) {
            countSpan.textContent = `(${count})`;
        }
    });
}

// Event listener for checkbox change
document.querySelectorAll('#categoriesSubcategories input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', fetchAndDisplayFilteredProducts);
});

// Fetch and display all products initially
fetchAndDisplayAllProducts();

