// This file defines the data models used in the application. It exports the necessary schemas or classes for interacting with the database.

const mongoose = require('mongoose');

// Example schema for a Movie model
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    backdrop: { type: String, required: true },
    trailer: { type: String, required: true },
    rating: { type: Number, required: true },
    newRelease: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    awards: { type: Number, default: 0 },
    language: { type: String, required: true },
    duration: { type: String, required: true },
    director: { type: String, required: true }
});

// Export the Movie model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
    Movie
};