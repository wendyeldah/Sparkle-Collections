# Sparkle Collections

Welcome to the Sparkle Collections project! This repository contains the code for a full-featured e-commerce platform. The project is structured to handle both the backend (with Node.js and Express) and the frontend (HTML, CSS, and JavaScript).

## Table of Contents

1. [Project Structure](#project-structure)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [File Overview](#file-overview)
5. [Routes and CRUD Operations](#routes-and-crud-operations)
6. [License](#license)

## Project Structure

The project consists of the following main files and directories:

```
│
├── controllers/
│ ├── authController.js
│ ├── cartController.js
│ ├── productController.js
│ └── userController.js
│
├── models/
│ ├── Cart.js
│ ├── Product.js
│ └── User.js
│
├── routes/
│ ├── authRoutes.js
│ ├── cartRoutes.js
│ ├── productRoutes.js
│ └── userRoutes.js
│
├── public_html/
│ ├── css/
│ │ ├── bootstrap.min.css
│ │ ├── style.css
│ │ └── owl.carousel.min.css
│ │
│ ├── js/
│ │ ├── jquery-3.6.0.min.js
│ │ ├── bootstrap.min.js
│ │ ├── popper.min.js
│ │ ├── owl.carousel.min.js
│ │ ├── script.js
│ │ ├── fetchUser.js
│ │ ├── main.js
│ │ ├── login.js
│ │ ├── loginApi.js
│ │ ├── productApi.js
│ │ ├── singleProduct.js
│ │ ├── singleProductApi.js
│ │ ├── signup.js
│ │ ├── signupApi.js
│ │ └── jquery.sticky.js
│ │
│ ├── pages/
│ │ ├── cart.html
│ │ ├── landingpage.html
│ │ ├── login.html
│ │ ├── profile-settings.html
│ │ ├── signup.html
│ │ ├── singleProduct.html
│ │ └── thankyou.html
│ │
│ ├── index.html
│
├── app.js
├── dbConnection.js
├── package.json
├── package-lock.json
└── README.md
```

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, Bootstrap, JavaScript, jQuery, Owl Carousel
- **Authentication**: JWT (JSON Web Token)
- **Other**: bcryptjs for password hashing

## Setup and Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/wendyeldah/Sparkle-Collections.git
    ```
2. **Navigate to the project directory**:
    ```bash
    cd sparkle-collections
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Start the server**:
    ```bash
    npm run start
    ```
5. **Open `index.html` in your browser**:
    ```bash
    http://localhost:3000/    
    ```

## File Overview

### Backend

- **app.js**: Main application file where the Express server is set up.
- **dbConnection.js**: MongoDB connection setup.
- **controllers/**: Contains logic for handling requests.
- **models/**: Mongoose models for MongoDB collections.
- **routes/**: Defines the API endpoints.

### Frontend

- **public_html/index.html**: Main HTML file for the landing page.
- **public_html/pages/**: Additional HTML pages for cart, login, signup, etc.
- **public_html/css/**: Stylesheets.
- **public_html/js/**: JavaScript files for interactivity.

## Routes and CRUD Operations

### Authentication Routes (`routes/authRoutes.js`)

- **POST /register**: Register a new user.
    ```javascript
    router.post('/register', async (req, res) => {
      // Registration logic here
    });
    ```
- **POST /login**: Log in a user.
    ```javascript
    router.post('/login', async (req, res) => {
      // Login logic here
    });
    ```

### Cart Routes (`routes/cartRoutes.js`)

- **POST /add**: Add an item to the cart.
    ```javascript
    router.post('/add', cartController.addItemToCart);
    ```
- **DELETE /remove/:productId**: Remove an item from the cart.
    ```javascript
    router.delete('/remove/:productId', cartController.removeItemFromCart);
    ```
- **GET /**: Get all items in the cart.
    ```javascript
    router.get('/', cartController.getCartItems);
    ```
- **PUT /update/:productId**: Update the quantity of a product in the cart.
    ```javascript
    router.put('/update/:productId', cartController.updateCartItemQuantity);
    ```

### Product Routes (`routes/productRoutes.js`)

- **GET /**: Get all products.
    ```javascript
    router.get('/', productController.getAllProducts);
    ```
- **GET /:id**: Get a product by ID.
    ```javascript
    router.get('/:id', productController.getProductById);
    ```
- **POST /**: Create a new product.
    ```javascript
    router.post('/', productController.createProduct);
    ```
- **PUT /:id**: Update a product by ID.
    ```javascript
    router.put('/:id', productController.updateProduct);
    ```
- **DELETE /:id**: Delete a product by ID.
    ```javascript
    router.delete('/:id', productController.deleteProduct);
    ```

### User Routes (`routes/userRoutes.js`)

- **POST /signup**: Create a new user.
    ```javascript
    router.post('/signup', userController.signup);
    ```
- **GET /**: Retrieve all users.
    ```javascript
    router.get('/', userController.getAllUsers);
    ```
- **GET /:userId**: Retrieve a single user by ID.
    ```javascript
    router.get('/:userId', userController.getUserById);
    ```
- **PATCH /:userId**: Update a user by ID.
    ```javascript
    router.patch('/:userId', userController.updateUser);
    ```
- **DELETE /:userId**: Delete a user by ID.
    ```javascript
    router.delete('/:userId', userController.deleteUser);
    ```
- **POST /login**: Log in a user.
    ```javascript
    router.post('/login', authController.login);
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to contribute, report issues, or suggest improvements! Thank you for using Sparkle Collections.
