const express = require('express');
// Additional package for logging of HTTP requests/responses
const morgan = require('morgan');
const session = require('express-session');
const { connectToDB, sessionStore } = require('./dbConnection'); // Import sessionStore
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();


// Serve static files from the public_html directory
app.use(express.static(path.join(__dirname, 'public_html')));

// Body parser middleware
app.use(express.json());
app.use(morgan('common'));
// Connect to MongoDB and set up session middleware
connectToDB()
  .then(() => {
    // Configure session middleware
    app.use(session({
      secret: 'YOUR_SECRET_KEY',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
      }
    }));

    // Register user routes
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
      console.log(`http://localhost:3000/`)
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err.message));
