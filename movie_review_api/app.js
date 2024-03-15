// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const mongodb = require('./config')
const moviesRoutes = require('./routes/movies')
const reviewsRoutes = require('./routes/reviews')

const app = express();
const PORT = process.env.PORT || 8080;
const body_parser = require('body-parser');

// Middleware to parse JSON in the request body
app.use(body_parser.json());
// Use the CORS middleware
app.use(cors());


// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Connecting MongoDB Database
mongoose.connect(`mongodb+srv://${mongodb.username}:${mongodb.password}@cluster0.mnenzg5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {  console.log('MongoDB connected successfully');});

// API routes
app.use('/movies', moviesRoutes);
app.use('/reviews', reviewsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
