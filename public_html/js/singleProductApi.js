document.addEventListener('DOMContentLoaded', function () {
    // Get the product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch the product details from the backend API
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            // Populate the product content with the fetched data
            const productName = document.querySelector('.product-description h2');
            productName.textContent = product.name;

            // Populate star rating if available
            const ratingContainer = document.getElementById('rating');
            ratingContainer.innerHTML = '';
            if (product.rating) {
                const rating = Math.round(product.rating); // Round to nearest whole number
                const ratingText = document.createElement('span');
                ratingText.textContent = `Rating: ${rating}`;
                ratingContainer.appendChild(ratingText);
                for (let i = 0; i < 5; i++) {
                    const starIcon = document.createElement('i');
                    if (i < rating) {
                        starIcon.classList.add('bi', 'bi-star-fill');
                        starIcon.classList.add('px-1');
                        starIcon.style.color = 'orange'; // Bright orange color
                    } else {
                        starIcon.classList.add('bi', 'bi-star-fill');
                    }
                    ratingContainer.appendChild(starIcon);
                }
            } else {
                ratingContainer.textContent = 'No rating available';
            }

            // Populate size selection options
            const sizeSelect = document.getElementById('size');
            sizeSelect.innerHTML = '';
            product.sizes.forEach(size => {
                const option = document.createElement('option');
                option.textContent = size;
                sizeSelect.appendChild(option);
            });

            // Populate color selection options
            const colorSelect = document.getElementById('color');
            colorSelect.innerHTML = '';
            product.colors.forEach(color => {
                const option = document.createElement('option');
                option.textContent = color;
                colorSelect.appendChild(option);
            });

            // Populate product description
            const productDescription = document.querySelector('.product-description p');
            productDescription.textContent = product.description;

            // Populate product details
            const productDetailsList = document.querySelector('.product-description ul');
            productDetailsList.innerHTML = '';
            product.product_details.forEach(detail => {
                const listItem = document.createElement('li');
                listItem.textContent = detail;
                productDetailsList.appendChild(listItem);
            });

            // Populate large image with the first image in the array
            const largeImage = document.getElementById('largeImage');
            largeImage.src = product.images[0];


            // Populate small images
            const smallImagesContainer = document.getElementById('small_images');
            smallImagesContainer.innerHTML = '';
            product.images.forEach((imageUrl, index) => {
                const div = document.createElement('div');
                div.classList.add('col-6', 'mb-2');
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = `Small Image ${index + 1}`;
                img.classList.add('img-fluid');
                img.onclick = function() {
                    displayLargeImage(imageUrl);
                };
                div.appendChild(img);
                smallImagesContainer.appendChild(div);
            });

            // Populate quantity input
            const quantityInput = document.getElementById('quantity');
            quantityInput.placeholder = '1';

            // Populate price
            const priceElement = document.getElementById('price');
            let price = parseFloat(product.current_price);
            let quantity = 1;
            updatePrice(price, quantity);

            // Decrease quantity function
            function decreaseQuantity() {
                if (quantity > 1) {
                    quantity--;
                    quantityInput.value = quantity;
                    updatePrice(price, quantity);
                }
            }

            // Increase quantity function
            function increaseQuantity() {
                quantity++;
                quantityInput.value = quantity;
                updatePrice(price, quantity);
            }

            // Add event listeners for quantity buttons
            const decreaseButton = document.getElementById('decreaseBtn');
            const increaseButton = document.getElementById('increaseBtn');
            decreaseButton.addEventListener('click', decreaseQuantity);
            increaseButton.addEventListener('click', increaseQuantity);

            // Update price based on quantity
            quantityInput.addEventListener('input', function() {
                quantity = parseInt(this.value);
                updatePrice(price, quantity);
            });

            // Update price function
            function updatePrice(price, quantity) {
                const totalPrice = price * quantity;
                priceElement.textContent = `$ ${totalPrice.toFixed(2)}`;
            }

            // Fetch and populate featured products
            fetch('http://localhost:3000/api/products')
                .then(response => response.json())
                .then(products => {
                    const featuredProductsContainer = document.getElementById('featuredProducts');
                    featuredProductsContainer.innerHTML = '';

                    // Filter products based on category
                    const featuredCategoryProducts = products.filter(prod => prod.category === product.category);

                    // Exclude the product already fetched
                    const filteredFeaturedProducts = featuredCategoryProducts.filter(prod => prod._id !== productId);

                    // Limit to maximum 5 products
                    const featuredProducts = filteredFeaturedProducts.slice(0, 5);

                    featuredProducts.forEach(product => {
                        const productCard = `
                            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <div class="card">
                                    <img src="${product.images[0]}" class="card-img-top" alt="Featured Product" style="height: 200px;">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text text-sm">${product.description}</p>
                                        <p class="card-text">$${product.current_price}</p>
                                        <div class="d-flex justify-content-center align-items-center">
                                            <button onclick="addToCartClicked(this.parentNode.parentNode.parentNode)" class="btn btn-primary">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        featuredProductsContainer.innerHTML += productCard;
                    });
                })
                .catch(error => {
                    console.error('Error fetching products:', error);
                });

        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
});
