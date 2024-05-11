// Fetch products from the backend API
fetch('http://localhost:3000/api/products/')
    .then(response => response.json())
    .then(products => {
        // Get the products container
        const productsContainer = document.getElementById('products');

        // Iterate through each product and create a product card
        products.forEach(product => {
            // Create a div element for the product card
            const productCard = document.createElement('div');
            productCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4', 'product-card', 'position-relative', 'overflow-hidden');

            // Set inner HTML for the product card
            productCard.innerHTML = `
                <div class="card">
                    <div class="card-header position-relative">
                        <img src="${product.images[0]}" class="card-img-top" alt="Product Image">
                        <button class="quick-view-btn">
                            <i class="bi bi-eye"></i> Quick View
                        </button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="price-section">
                            <p class="previous-price">$${product.previous_price}</p>
                            <p class="current-price">Now $${product.current_price}</p>
                        </div>
                        <div class="text-center">
                            <a href="#" class="btn btn-primary w-100">Add to Cart</a>
                        </div>
                    </div>
                </div>
            `;

            // Set the product ID as a data attribute for the card
            productCard.dataset.productId = product._id;

            // Append the product card to the products container
            productsContainer.appendChild(productCard);

            // Add event listener to the quick view button
            const quickViewBtn = productCard.querySelector('.quick-view-btn');
            quickViewBtn.addEventListener('click', () => {
                // Retrieve the product ID
                const productId = productCard.dataset.productId;
                
                // Construct the URL for the single product page
                const singleProductUrl = `http://localhost:3000/pages/singleProduct.html?id=${productId}`;
                
                // Redirect the user to the single product page
                window.location.href = singleProductUrl;
            });
        });
    })
    .catch(error => {
        console.error('Error fetching products:', error);
    });
