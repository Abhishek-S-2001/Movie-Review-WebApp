// routes/movies.js
const express = require('express');
const Movie = require('../models/moviesModel');
const router = express.Router();

// Retrieve all Movie Details
router.get('/all', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({ movies });
  } catch (error) {
    console.error('Error retrieving movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new movie
router.post('/add', async (req, res) => {
  try {
    const { mname, release, mrating } = req.body;
    // Create a new movie entry
    const newMovie = new Movie({
      mname,
      release,
      mrating,
    });

    await newMovie.save();

    res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
  } catch (error) {
    console.error('Error adding movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a movie by ID
router.delete('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    await Movie.findByIdAndDelete(movieId);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
module.exports = router;