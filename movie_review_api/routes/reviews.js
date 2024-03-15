const express = require('express');

const Movie = require('../models/moviesModel');

const router = express.Router();


// Add a review to a movie
router.post('/:movieId/reviews/add', async (req, res) => {
  try {
    const { movieId } = req.params;
    const { review, rname, rrating } = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    movie.reviews.push({ review, rname, rrating });
    await movie.save();

    res.status(201).json({ message: 'Review added successfully', movie });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all reviews of a movie
router.get('/:movieId/reviews', async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    const mname = movie.mname;
    const reviews = movie.reviews;
    res.json({ mname, reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;