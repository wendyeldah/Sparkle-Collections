const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(require('express-session'));

async function connectToDB() {
  try {
    await mongoose.connect('mongodb+srv://kiplangatisackis:2qEaW9jYP8vqV2EX@cluster0.udeorvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Initialize MongoDBStore with session collection name and MongoDB connection
    const store = new MongoDBStore({
      uri: 'mongodb+srv://kiplangatisackis:2qEaW9jYP8vqV2EX@cluster0.udeorvn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      collection: 'sessions'
    });

    // Catch errors in MongoDBStore
    store.on('error', function(error) {
      console.error('Session store error:', error);
    });

    // Export the MongoDBStore instance for use in the session middleware
    module.exports.sessionStore = store;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    throw err;
  }
}

module.exports = { connectToDB };
