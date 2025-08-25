// fetchMovies.js (OMDb Version)

// This script will fetch movie data from OMDb and populate our database.

const mongoose = require('mongoose');
const axios = require('axios');

// --- 1. Database Connection and Model ---
const dbURI = 'mongodb+srv://moviko_admin:Moviko@moviko.l4bxzna.mongodb.net/movikoDB?retryWrites=true&w=majority&appName=Moviko';

// Adjusted schema to better fit OMDb's data
const movieSchema = new mongoose.Schema({
    imdb_id: { type: String, required: true, unique: true }, // OMDb uses IMDb IDs
    title: { type: String, required: true },
    description: { type: String },
    release_date: { type: Date },
    poster_url: { type: String },
    genres: [String],
    cast: [String],
    director: String,
    duration_minutes: Number,
    rating: Number,
});
// Important: Use a different model name or clear the old collection to avoid conflicts
const Movie = mongoose.model('OmdbMovie', movieSchema, 'movies');


// --- 2. OMDb API Configuration ---
// IMPORTANT: Replace 'YOUR_OMDB_API_KEY' with your actual key.
const OMDB_API_KEY = '5472d3e6';;
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

// A list of popular Indian movie titles to search for.
// OMDb works by searching for titles, not by region.
const movieTitlesToFetch = [
    'War', 'Pathaan', 'Jawan', 'Gadar 2', 'Baahubali 2: The Conclusion',
    'K.G.F: Chapter 2', 'RRR', 'Dangal', 'Sanju', 'Tiger Zinda Hai',
    'PK', 'Bajrangi Bhaijaan', 'Sultan', 'Kabir Singh', '3 Idiots'
];

// --- 3. The Main Fetching Function ---
const fetchAndSaveMovies = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Database connected. Fetching movies from OMDb...');

        for (const title of movieTitlesToFetch) {
            console.log(`Fetching data for '${title}'...`);
            
            const response = await axios.get(OMDB_BASE_URL, {
                params: {
                    apikey: OMDB_API_KEY,
                    t: title // Search by title
                }
            });

            const movieData = response.data;

            if (movieData.Response === 'False') {
                console.log(`Could not find movie: '${title}'. Skipping.`);
                continue;
            }

            // Check if movie already exists in our DB
            const existingMovie = await Movie.findOne({ imdb_id: movieData.imdbID });
            if (existingMovie) {
                console.log(`Skipping '${movieData.Title}', already in database.`);
                continue;
            }
            
            // Helper function to parse runtime string "150 min" to a number 150
            const parseRuntime = (runtimeStr) => {
                if (!runtimeStr) return null;
                return parseInt(runtimeStr.split(' ')[0]);
            };

            const newMovie = new Movie({
                imdb_id: movieData.imdbID,
                title: movieData.Title,
                description: movieData.Plot,
                release_date: new Date(movieData.Released),
                poster_url: movieData.Poster !== 'N/A' ? movieData.Poster : null,
                genres: movieData.Genre ? movieData.Genre.split(', ') : [],
                cast: movieData.Actors ? movieData.Actors.split(', ') : [],
                director: movieData.Director,
                duration_minutes: parseRuntime(movieData.Runtime),
                rating: movieData.imdbRating !== 'N/A' ? parseFloat(movieData.imdbRating) : null,
            });

            await newMovie.save();
            console.log(`Successfully saved '${newMovie.title}' to the database.`);
        }

    } catch (error) {
        if (error.response) {
            console.error('API Error:', error.response.data);
        } else {
            console.error('An error occurred:', error.message);
        }
    } finally {
        await mongoose.disconnect();
        console.log('Database disconnected.');
    }
};

// --- 4. Run the Script ---
fetchAndSaveMovies();