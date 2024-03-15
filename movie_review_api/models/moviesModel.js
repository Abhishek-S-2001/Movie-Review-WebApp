const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: { type: String, required: true },
  rname: { type: String, required: true },
  rrating: {type: Number, required: true},
});

const moviesSchema = new mongoose.Schema({
  mname: { type: String, required: true },
  release: { type: String, required: true },
  mrating: {type: Number, required: true},
  reviews: [reviewSchema],
});

const Movie = mongoose.model('Movies', moviesSchema);

module.exports = Movie;