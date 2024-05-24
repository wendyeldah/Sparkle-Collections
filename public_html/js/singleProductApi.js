
document.addEventListener('DOMContentLoaded', function () {
    // Get the product ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Fetch the product details from the backend API
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            // Populate the product content with the fetched data
            populateProductDetails(product);
            
            // Fetch and populate featured products
            fetchFeaturedProducts(product.category, productId);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
});

function populateProductDetails(product) {
    const productName = document.querySelector('.product-description h2');
    productName.textContent = product.name;

    const ratingContainer = document.getElementById('rating');
    ratingContainer.innerHTML = '';
    if (product.rating) {
        const rating = Math.round(product.rating);
        const ratingText = document.createElement('span');
        ratingText.textContent = `Rating: ${rating}`;
        ratingContainer.appendChild(ratingText);
        for (let i = 0; i < 5; i++) {
            const starIcon = document.createElement('i');
            starIcon.classList.add('bi', 'bi-star-fill', 'px-1');
            starIcon.style.color = i < rating ? 'orange' : '#ccc';
            ratingContainer.appendChild(starIcon);
        }
    } else {
        ratingContainer.textContent = 'No rating available';
    }

    const sizeSelect = document.getElementById('size');
    sizeSelect.innerHTML = '';
    product.sizes.forEach(size => {
        const option = document.createElement('option');
        option.textContent = size;
        sizeSelect.appendChild(option);
    });

    const colorSelect = document.getElementById('color');
    colorSelect.innerHTML = '';
    product.colors.forEach(color => {
        const option = document.createElement('option');
        option.textContent = color;
        colorSelect.appendChild(option);
    });

    const productDescription = document.querySelector('.product-description p');
    productDescription.textContent = product.description;

    const productDetailsList = document.querySelector('.product-description ul');
    productDetailsList.innerHTML = '';
    product.product_details.forEach(detail => {
        const listItem = document.createElement('li');
        listItem.textContent = detail;
        productDetailsList.appendChild(listItem);
    });

    const largeImage = document.getElementById('largeImage');
    largeImage.src = product.images[0];

    const smallImagesContainer = document.getElementById('small_images');
    smallImagesContainer.innerHTML = '';
    product.images.forEach((imageUrl, index) => {
        const div = document.createElement('div');
        div.classList.add('col-6', 'mb-2');
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Small Image ${index + 1}`;
        img.classList.add('img-fluid');
        img.onclick = function () {
            displayLargeImage(imageUrl);
        };
        div.appendChild(img);
        smallImagesContainer.appendChild(div);
    });

    const quantityInput = document.getElementById('quantity');
    quantityInput.placeholder = '1';

    const priceElement = document.getElementById('price');
    let price = parseFloat(product.current_price);
    let quantity = 1;
    updatePrice(price, quantity);

    const decreaseButton = document.getElementById('decreaseBtn');
    const increaseButton = document.getElementById('increaseBtn');
    decreaseButton.addEventListener('click', function () {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
            updatePrice(price, quantity);
        }
    });
    increaseButton.addEventListener('click', function () {
        quantity++;
        quantityInput.value = quantity;
        updatePrice(price, quantity);
    });

    quantityInput.addEventListener('input', function () {
        quantity = parseInt(this.value);
        updatePrice(price, quantity);
    });

    function updatePrice(price, quantity) {
        const totalPrice = price * quantity;
        priceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }
}

function fetchFeaturedProducts(category, excludedProductId) {
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(products => {
            const featuredProductsContainer = document.getElementById('featuredProducts');
            featuredProductsContainer.innerHTML = '';

            const featuredCategoryProducts = products.filter(prod => prod.category === category);
            const filteredFeaturedProducts = featuredCategoryProducts.filter(prod => prod._id !== excludedProductId);
            const featuredProducts = filteredFeaturedProducts.slice(0, 5);

            featuredProducts.forEach(product => {
                const productCard = `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <div class="card">
                            <img src="${product.images[0]}" class="card-img-top" alt="Featured Product" style="height: 200px;" data-product-id="${product._id}">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                                <p class="card-text text-sm">${product.description}</p>
                                <p class="card-text">$${product.current_price}</p>
                                <div class="d-flex justify-content-center align-items-center">
                                    <button onclick="addToCartClicked('${product._id}', '${product.name}', '${product.current_price}', '${product.images[0]}')" class="btn btn-primary w-100" data-product-id="${product._id}">Add to Cart</button>
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
}

function addToCartAndOpenModal(product, quantity) {
    addToCart(product, quantity);

    $('#cartModal').modal('show');
    const itemsCount = document.getElementById('cartItemCount');
    itemsCount.textContent = quantity;

    const modalBody = document.querySelector('.modal-body');
    const productDetails = `
        <div class="row">
            <div class="col-md-4">
                <img src="${product.images[0]}" class="img-fluid" alt="Product Image">
            </div>
            <div class="col-md-4">
                <p>Name: ${product.name}</p>
                <p>Quantity: ${quantity}</p>
            </div>
            <div class="col-md-4">
                <p>Total Price: $${(product.current_price * quantity).toFixed(2)}</p>
            </div>
        </div>
    `;
    modalBody.innerHTML = productDetails;
}

function addToCart(product, quantity) {
    console.log('Adding product to cart:', product);

    fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: product._id,
            quantity: quantity
        }),
    })
    .then(response => {
        if (response.ok) {
            console.log('Product added to cart successfully');
        } else {
            console.error('Error adding product to cart');
        }
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
    });
}

function addToCartClicked(productId, productName, productPrice, productImage) {
    const product = {
        _id: productId,
        name: productName,
        current_price: parseFloat(productPrice),
        images: [productImage]
    };

    addToCartAndOpenModal(product, 1);
}

function displayLargeImage(imageUrl) {
    const largeImage = document.getElementById('largeImage');
    largeImage.src = imageUrl;
}
