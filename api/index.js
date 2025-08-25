// server.js

// --- 1. Import Dependencies ---
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// --- 2. Initialize the App ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- 3. Middleware ---
app.use(cors());
app.use(express.json());

// --- 4. Database Connection ---
const dbURI = 'mongodb+srv://moviko_admin:Moviko@moviko.l4bxzna.mongodb.net/movikoDB?retryWrites=true&w=majority&appName=Moviko';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));

// --- 5. Mongoose Schemas and Models ---

// -- Movie Schema --
const movieSchema = new mongoose.Schema({
    imdb_id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    release_date: { type: Date },
    poster_url: { type: String },
    backdrop_url: { type: String },
    trailer_url: { type: String },
    genres: [String],
    cast: [String],
    director: String,
    duration_minutes: Number,
    rating: Number,
});
const Movie = mongoose.model('Movie', movieSchema, 'movies');


// -- Theater Schema --
const theaterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    total_screens: { type: Number, required: true },
});
const Theater = mongoose.model('Theater', theaterSchema, 'theaters');

// -- Showtime Schema --
const showtimeSchema = new mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theater_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    screen_number: { type: Number, required: true },
    show_date: { type: Date, required: true },
    show_time: { type: String, required: true }, 
    price: { type: Number, required: true },
});
const Showtime = mongoose.model('Showtime', showtimeSchema, 'showtimes');

// -- Booking Schema --
const bookingSchema = new mongoose.Schema({
    user_email: { 
        type: String, 
        required: true, 
        index: true,
        // Using a custom setter to automatically normalize the email on save
        set: value => value.trim().toLowerCase()
    },
    user_phone: { type: String, required: true },
    showtime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
    seats: { type: [String], required: true },
    total_price: { type: Number, required: true },
    booking_time: { type: Date, default: Date.now },
    status: { type: String, default: 'Confirmed' },
});

const Booking = mongoose.model('Booking', bookingSchema, 'bookings');


// --- 6. API Routes (Endpoints) ---

app.get('/', (req, res) => {
    res.send('Welcome to the MOVIKO Backend API!');
});

app.get('/api/movies', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching movies', error: err.message });
    }
});

app.post('/api/theaters', async (req, res) => {
    const { name, city, address, total_screens } = req.body;
    try {
        const newTheater = new Theater({ name, city, address, total_screens });
        await newTheater.save();
        res.status(201).json(newTheater);
    } catch (err) {
        res.status(400).json({ message: 'Error creating theater', error: err.message });
    }
});

app.get('/api/showtimes/:movieId/:date', async (req, res) => {
    try {
        const { movieId, date } = req.params;
        // Use a more robust date query
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const showtimes = await Showtime.find({ 
            movie_id: movieId, 
            show_date: { $gte: startOfDay, $lte: endOfDay } 
        }).populate('theater_id');
        
        res.json(showtimes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching showtimes', error: err.message });
    }
});

app.post('/api/showtimes', async (req, res) => {
    const { movie_id, theater_id, screen_number, show_date, show_time, price } = req.body;
    try {
        const newShowtime = new Showtime({ movie_id, theater_id, screen_number, show_date, show_time, price });
        await newShowtime.save();
        res.status(201).json(newShowtime);
    } catch (err) {
        res.status(400).json({ message: 'Error creating showtime', error: err.message });
    }
});

app.post('/api/bookings', async (req, res) => {
    const { user_email, user_phone, showtime_id, seats, total_price } = req.body;
    try {
        // The `set` property in the schema now handles normalization automatically.
        const newBooking = new Booking({ 
            user_email, 
            user_phone, 
            showtime_id, 
            seats, 
            total_price 
        });
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: 'Error creating booking', error: err.message });
    }
});

app.get('/api/bookings/user/:email', async (req, res) => {
    try {
        const userEmail = req.params.email.toLowerCase();
        const bookings = await Booking.find({ user_email: userEmail })
            .populate({
                path: 'showtime_id',
                // Populate both movie and theater from the showtime document
                populate: [
                    { path: 'movie_id', model: 'Movie' },
                    { path: 'theater_id', model: 'Theater' }
                ]
            })
            .sort({ booking_time: -1 });

        if (!bookings || bookings.length === 0) {
            return res.json([]);
        }

        const formattedBookings = bookings.map(b => {
            // Check if all populated data exists before returning
            if (!b.showtime_id || !b.showtime_id.movie_id || !b.showtime_id.theater_id) {
                console.warn(`Booking ${b._id} has missing populated data. Skipping.`);
                return null;
            }
            return {
                _id: b._id,
                seats: b.seats,
                total_price: b.total_price,
                booking_time: b.booking_time,
                showtime: {
                    start_time: b.showtime_id.show_date,
                    screen_number: b.showtime_id.screen_number,
                    movie: {
                        title: b.showtime_id.movie_id.title,
                        poster_url: b.showtime_id.movie_id.poster_url,
                    },
                    theater: {
                        name: b.showtime_id.theater_id.name,
                    }
                }
            }
        }).filter(b => b !== null);

        res.json(formattedBookings);
    } catch (err) {
        console.error("Error fetching user bookings:", err);
        res.status(500).json({ message: 'Error fetching user bookings', error: err.message });
    }
});

// --- UPDATED ROUTE: Use this to create mock data for the next 7 days ---
app.get('/api/initialize-data', async (req, res) => {
    try {
        // Create 3-4 mock theaters
        const theaters = [
            { name: 'PVR Cinemas', city: 'Hubballi', address: 'Bhavani Complex', total_screens: 4 },
            { name: 'INOX', city: 'Hubballi', address: 'U Mall', total_screens: 3 },
            { name: 'Cinepolis', city: 'Hubballi', address: 'Urban Oasis Mall', total_screens: 5 }
        ];

        // Delete any old theaters and showtimes first to prevent duplicates
        await Theater.deleteMany({});
        await Showtime.deleteMany({});

        const createdTheaters = await Theater.insertMany(theaters);
        console.log('Created Theaters:', createdTheaters);

        // Get the movies from your database to link showtimes
        const movies = await Movie.find({});
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found to create showtimes.' });
        }

        // --- EDITED: Create showtimes for the next 7 days for all movies ---
        const showtimes = [];
        const today = new Date();

        // Loop for the next 7 days
        for (let i = 0; i < 7; i++) {
            const showDate = new Date(today);
            showDate.setDate(today.getDate() + i);
            showDate.setHours(0, 0, 0, 0); // Standardize to the beginning of the day

            movies.forEach(movie => {
                createdTheaters.forEach(theater => {
                    // Add a few showtimes for each movie/theater/day combination
                    showtimes.push({
                        movie_id: movie._id,
                        theater_id: theater._id,
                        screen_number: 1,
                        show_date: showDate, // Use the date from our loop
                        show_time: "10:00 AM",
                        price: 150
                    });
                    showtimes.push({
                        movie_id: movie._id,
                        theater_id: theater._id,
                        screen_number: 2,
                        show_date: showDate, // Use the date from our loop
                        show_time: "02:30 PM",
                        price: 180
                    });
                    showtimes.push({
                        movie_id: movie._id,
                        theater_id: theater._id,
                        screen_number: 3,
                        show_date: showDate, // Use the date from our loop
                        show_time: "07:00 PM",
                        price: 200
                    });
                });
            });
        }

        const createdShowtimes = await Showtime.insertMany(showtimes);
        console.log(`Created ${createdShowtimes.length} Showtimes across 7 days.`);

        res.status(201).json({
            message: 'Successfully initialized data for the next 7 days.',
            theaters: createdTheaters.length,
            showtimes: createdShowtimes.length
        });
    } catch (err) {
        console.error("Error initializing data:", err);
        res.status(500).json({ message: 'Error initializing data', error: err.message });
    }
});


// --- NEW: Temporary route to fix existing bookings ---
// IMPORTANT: Remove this route after you've successfully run it once.
app.get('/api/bookings/normalize-emails', async (req, res) => {
    try {
        const bookingsToUpdate = await Booking.find({});
        let updatedCount = 0;
        
        for (const booking of bookingsToUpdate) {
            const originalEmail = booking.user_email;
            const normalizedEmail = originalEmail.trim().toLowerCase();
            
            if (originalEmail !== normalizedEmail) {
                booking.user_email = normalizedEmail;
                await booking.save();
                updatedCount++;
            }
        }
        
        res.status(200).json({ 
            message: `Successfully normalized email addresses for ${updatedCount} bookings. You can now safely remove this route.`,
            total_bookings_found: bookingsToUpdate.length
        });
    } catch (err) {
        res.status(500).json({ message: 'Error normalizing emails', error: err.message });
    }
});

// --- 7. Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
