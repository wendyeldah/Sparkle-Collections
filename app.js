const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const { connectToDB, sessionStore } = require('./dbConnection');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(express.json());
app.use(morgan('common'));

app.use(express.static(path.join(__dirname, 'public_html')));


connectToDB()
  .then(() => {
    app.use(session({
      secret: 'YOUR_SECRET_KEY',
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
    }));

    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/cart', cartRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`http://localhost:3000/`);
    });

    // Middleware for handling route not found errors
    app.use((req, res) => {
      res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
          <title>Page Not Found</title>
          <style>
            .jumbotron {
              width: 100%;
              height: 100vh;
              font-size: 2.0rem;
              color: white;
              background: #606c88;
              background: -webkit-linear-gradient(to right, #1F1C2C, #525c74);
              background: linear-gradient(to right, #1F1C2C, #545f78);
              padding: 26px;
              margin: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
          </style>
        </head>
        <body>
          <div class="jumbotron">
          <div>
            <h1>This page is coming soon</h1>
          </div>
          <div>
            <p class="lead mt-2"><a href="/">Go Back</a></p>
          </div>
          </div>
        </body>
        </html>
      `);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB:', err.message));
