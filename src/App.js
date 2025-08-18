import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Clock, Star, Play, User, Menu, X, ChevronRight, Filter, Heart, Share2, Bookmark, ArrowRight, Zap, Award, Users, TrendingUp, Gift, Bell, Settings, LogOut, Armchair, CreditCard, CheckCircle, Sparkles } from 'lucide-react';

const App = () => { // Renamed from MovikoApp to App
  // State management for UI elements and data
  const [activeTab, setActiveTab] = useState('movies');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [likedMovies, setLikedMovies] = useState(new Set());
  const [bookmarkedMovies, setBookmarkedMovies] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [selectedShow, setSelectedShow] = useState(null);
  const [numberOfTickets, setNumberOfTickets] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [watchingTrailer, setWatchingTrailer] = useState(null);
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  // Auto-slide for hero section
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Simulates a loading animation on initial app load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Effect to reset state when a new movie is selected or modal is closed
  useEffect(() => {
    if (selectedMovie) {
      setBookingStep(1);
      setSelectedShow(null);
      setSelectedSeats(new Set());
      setNumberOfTickets(0);
      setSelectedLanguage(null);
    }
  }, [selectedMovie]);

  // Premium movie data with a more realistic showtime structure
  const movies = [
    {
      id: 1,
      title: "WAR-2",
      genre: "Action",
      rating: 8.9,
     
      duration: "2h 46m",
      language: "Multi-Language",
      languages: ["Hindi", "Telugu"], // Language options for this specific movie
      image: "https://m.media-amazon.com/images/M/MV5BY2U0MGFkNzctOGI5OC00MzhhLWExYTctZjE5YjY3MzcwYjMzXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      backdrop: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOq2PWmp03Hwv2veHHQLSpfOsS4OSiuus_SYcx1E1G_2mdPc4BcUalvGgEd6U7JhzfSg&usqp=CAU",
      description: "An Indian soldier is assigned to eliminate his former mentor, who has gone rogue. A deadly chase ensues.",
      price: 150,
      trending: true,
      newRelease: false,
      awards: 3,
      cast: ["HRITHIK ROSHAN", "KIARA ADVANI", "JR.NTR"],
      director: "AYAAN MUKHERJI",
      trailer: "https://www.youtube.com/embed/mjBym9uKth4",
      showtimesByTheater: [
        { theater: "PVR Cinemas", times: ["10:30 AM", "2:15 PM", "6:00 PM", "9:45 PM"] },
        { theater: "Cinepolis", times: ["11:00 AM", "3:00 PM", "7:00 PM"] },
        { theater: "Big Cinemas", times: ["10:00 AM", "1:30 PM", "8:45 PM"] },
      ]
    },
    {
      id: 2,
      title: "COOLIE -POWERHOUSE",
      genre: "Action",
      rating: 8.7,
      duration: "3h 0m",
      language: "Tamil",
      ageRating: "18+",
      image: "https://www.wallsnapy.com/img_gallery/coolie-movie-rajini--poster-4k-download-9445507.jpg",
      backdrop: "https://images.moneycontrol.com/static-mcnews/2025/05/20250527093118_cooliehh.jpg?impolicy=website&width=1600&height=900",
      description: "A common man from the slums rises to become a powerful gangster.",
      price: 180,
      trending: false,
      newRelease: false,
      awards: 7,
      cast: ["RAJNIKANT", "UPENDRA", "NAGARJUNA."],
      director: "LOKESH KANAKRAJ",
       trailer: "https://youtu.be/PuzNA314WCI?si=Pck73C4v5mDdN0QV",
      showtimesByTheater: [
        { theater: "PVR Cinemas", times: ["11:00 AM", "3:30 PM", "7:15 PM"] },
        { theater: "Cinepolis", times: ["12:00 PM", "4:30 PM", "8:15 PM"] },
      ]
    },
    {
      id: 3,
      title: "SU FROM SO",
      genre: "Action",
      rating: 9.2,
      duration: "2h 30m",
      language: "KANNADA",
      image: "https://assetscdn1.paytm.com/images/cinema/Su-From-So---Gallery-b4465bc0-661d-11f0-b49e-0daac2dae3b7.jpg",
      backdrop: "https://assets-in.bmscdn.com/discovery-catalog/events/et00454128-xqcbzlvjha-landscape.jpg",
      description: "A common man from the slums rises to become a powerful gangster.",
      price: 160,
      trending: true,
      newRelease: true,
      awards: 0,
      cast: ["RAVI ANNA", "Shruti Haasan"],
      director: "TUMBIDU",
      trailer: "https://www.youtube.com/embed/example",
      showtimesByTheater: [
        { theater: "Cinepolis", times: ["10:00 AM", "1:45 PM", "5:30 PM", "9:15 PM"] },
        { theater: "Big Cinemas", times: ["10:30 AM", "2:15 PM", "6:00 PM"] },
      ]
    },
    {
        id: 4,
        title: "Spider-Man: Across the Spider-Verse",
        genre: "Animation",
        rating: 9.1,
        duration: "2h 20m",
        language: "English",
        image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=450&fit=crop",
        backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&h=600&fit=crop",
        description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People.",
        price: 200,
        trending: true,
        newRelease: true,
        awards: 1,
        cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
        director: "Joaquim Dos Santos",
        trailer: "https://www.youtube.com/embed/cqGjhVJWtEg",
        showtimesByTheater: [
            { theater: "PVR Cinemas", times: ["11:30 AM", "2:45 PM", "6:30 PM", "10:00 PM"] },
            { theater: "Big Cinemas", times: ["12:00 PM", "3:15 PM", "7:00 PM"] },
        ]
    },
    {
        id: 7,
        title: "Chhaava",
        genre: "Historical",
        rating: 9.0,
        duration: "2h 41m",
        language: "Hindi",
        image: "https://i.pinimg.com/736x/fc/c7/a9/fcc7a9ab8bef27bf0f14e392bd8b3f91.jpg",
        backdrop: "https://www.bollywoodhungama.com/wp-content/uploads/2023/10/Chhaava-cover-image.jpg",
        description: "A historical drama based on the life of Chhatrapati Sambhaji Maharaj, the son of Chhatrapati Shivaji Maharaj.",
        price: 220,
        trending: true,
        newRelease: true,
        awards: 0,
        cast: ["Vicky Kaushal", "Rashmika Mandanna", "Akshaye Khanna"],
        director: "Laxman Utekar",
        trailer: "https://www.youtube.com/embed/77vRyWNqZjM",
        showtimesByTheater: [
            { theater: "PVR Cinemas", times: ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"] },
            { theater: "Cinepolis", times: ["11:30 AM", "3:30 PM", "7:30 PM"] },
            { theater: "Big Cinemas", times: ["12:00 PM", "4:00 PM", "8:00 PM"] },
        ]
    },
    {
        id: 8,
        title: "MAHAVATAR NARASIMHA",
        genre: "Historical",
        rating: 9.0,
        duration: "2h 41m",
        language: "Hindi",
        image: "https://images.filmibeat.com/ph-big/2025/07/mahavatar-narsimha1752499491_1.jpg",
        backdrop: "https://m.media-amazon.com/images/M/MV5BNDY1ZDIzYzQtNWE5YS00OThlLWJkZDAtOWU0YWNhYjMzMGM5XkEyXkFqcGc@._V1_.jpg",
        description: "A STORY OF LORD NARASIMHA AND HIRANYA KASHYAP,BHAKTA PRAHALAD.",
        price: 220,
        trending: true,
        newRelease: true,
        awards: 0,
        cast: [""],
        director: "Laxman Utekar",
        trailer: "https://www.youtube.com/embed/example",
        showtimesByTheater: [
            { theater: "PVR Cinemas", times: ["10:00 AM", "1:30 PM", "5:00 PM", "9:00 PM"] },
            { theater: "Cinepolis", times: ["11:30 AM", "3:30 PM", "7:30 PM"] },
            { theater: "Big Cinemas", times: ["12:00 PM", "4:00 PM", "8:00 PM"] },
        ]
    }
  ];
  
  const heroSlides = [
    { movie: movies[1], title: "Experience Cinema Like Never Before", subtitle: "Book premium seats with just a few taps" },
    { movie: movies[2], title: "Your Ultimate Movie Destination", subtitle: "Discover blockbusters and hidden gems" },
    { movie: movies[5], title: "Premium Comfort, Unbeatable Prices", subtitle: `Starting from just ₹${Math.min(...movies.map(m => m.price))} per ticket` }
  ];

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
  const genres = ['All', 'Action', 'Sci-Fi', 'Biography', 'Animation', 'Drama', 'Comedy', 'Thriller', 'Adventure', 'Historical'];

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const toggleLike = (movieId) => {
    const newLikedMovies = new Set(likedMovies);
    if (newLikedMovies.has(movieId)) newLikedMovies.delete(movieId);
    else newLikedMovies.add(movieId);
    setLikedMovies(newLikedMovies);
  };

  const toggleBookmark = (movieId) => {
    const newBookmarkedMovies = new Set(bookmarkedMovies);
    if (newBookmarkedMovies.has(movieId)) newBookmarkedMovies.delete(movieId);
    else newBookmarkedMovies.add(movieId);
    setBookmarkedMovies(newBookmarkedMovies);
  };

  const toggleSeat = (seatId) => {
    const newSelectedSeats = new Set(selectedSeats);
    if (newSelectedSeats.has(seatId)) {
        newSelectedSeats.delete(seatId);
    } else {
        if (newSelectedSeats.size < numberOfTickets) {
            newSelectedSeats.add(seatId);
        } else {
            // Optional: Add a message to the user that they can't select more seats
            console.log(`You can only select ${numberOfTickets} tickets.`);
        }
    }
    setSelectedSeats(newSelectedSeats);
  };

  // Premium Loading Screen component
  const LoadingScreen = () => (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: `${2 + Math.random() * 2}s` }} />
        ))}
      </div>
      <div className="text-center relative z-10">
        <div className="relative">
          <svg width="48" height="48" viewBox="0 0 100 100" className="animate-pulse drop-shadow-2xl">
            <path d="M15 20 C15 15, 20 10, 25 10 L75 10 C80 10, 85 15, 85 20 L85 35 C82 35, 80 37, 80 40 C80 43, 82 45, 85 45 L85 80 C85 85, 80 90, 75 90 L25 90 C20 90, 15 85, 15 80 L15 45 C18 45, 20 43, 20 40 C20 37, 18 35, 15 35 Z" fill="#EF4444" className="drop-shadow-lg"/>
            <polygon points="35,30 35,50 50,40" fill="white" className="drop-shadow-sm"/>
          </svg>
          <div className="absolute -inset-4 bg-red-400 rounded-full opacity-20 animate-ping"></div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 animate-fadeInUp">
          <span className="text-white tracking-wider">MOVIKO</span>
        </h1>
        <p className="text-xl text-white/80 mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>Book Tickets Faster, Anytime, Anywhere</p>
        <div className="flex space-x-2 justify-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {[0, 1, 2, 3].map((i) => (<div key={i} className="w-3 h-3 bg-white rounded-full animate-bounce opacity-80" style={{ animationDelay: `${i * 0.15}s` }}></div>))}
        </div>
      </div>
    </div>
  );

  // Hero Section component for the main carousel
  const HeroSection = () => (
    <div className="relative h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
      {heroSlides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.movie.backdrop} alt={slide.movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute left-8 md:left-16 top-1/2 transform -translate-y-1/2 text-white max-w-2xl">
            <div className="animate-slideInLeft">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">{slide.title}</h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed drop-shadow-md">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setSelectedMovie(slide.movie)} className="shimmer-button px-8 py-4 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 rounded-2xl font-bold text-lg hover:from-fuchsia-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-fuchsia-500/40">
                  Book Now - Starting at ₹{slide.movie.price}
                </button>
                <button onClick={() => setWatchingTrailer(slide.movie.trailer)} className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-2xl font-bold text-lg hover:bg-white/30 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white shadow-lg scale-125' : 'bg-white/40 hover:bg-white/60'}`} />
        ))}
      </div>
    </div>
  );

  // Movie Card component for individual movies
  const MovieCard = ({ movie, index }) => (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl hover:shadow-fuchsia-500/20 animate-slideInUp border border-gray-100" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="relative overflow-hidden">
        <img src={movie.image} alt={movie.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {movie.newRelease && (<span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">NEW</span>)}
          {movie.trending && (<span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"><TrendingUp className="w-3 h-3" /> TRENDING</span>)}
          {movie.awards > 0 && (<span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"><Award className="w-3 h-3" /> {movie.awards} AWARDS</span>)}
           {movie.ageRating && (<span className="px-3 py-1 bg-black text-white text-xs font-bold rounded-full shadow-lg">{movie.ageRating}</span>)}
        </div>
        <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl flex items-center gap-1 animate-fadeIn shadow-xl">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
          <span className="text-sm font-bold">{movie.rating}</span>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <button onClick={(e) => { e.stopPropagation(); toggleLike(movie.id); }} className={`p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg ${likedMovies.has(movie.id) ? 'bg-red-500 text-white shadow-red-500/30' : 'bg-white/90 text-gray-700 hover:bg-red-50'}`}>
            <Heart className={`w-5 h-5 ${likedMovies.has(movie.id) ? 'fill-white' : ''}`} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); toggleBookmark(movie.id); }} className={`p-3 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg ${bookmarkedMovies.has(movie.id) ? 'bg-blue-500 text-white shadow-blue-500/30' : 'bg-white/90 text-gray-700 hover:bg-blue-50'}`}>
            <Bookmark className={`w-5 h-5 ${bookmarkedMovies.has(movie.id) ? 'fill-white' : ''}`} />
          </button>
          <button className="p-3 rounded-2xl bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-110 shadow-lg"><Share2 className="w-5 h-5" /></button>
        </div>
        <button onClick={() => setWatchingTrailer(movie.trailer)} className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-fuchsia-500 to-rose-500 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-2xl">
            <Play className="w-12 h-12 text-white ml-1" fill="white" />
          </div>
        </button>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-fuchsia-600 transition-colors duration-300 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-700 px-3 py-1 rounded-full text-sm font-semibold">{movie.genre}</span>
          <span className="text-gray-600 font-medium text-sm">{movie.duration}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{movie.description}</p>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Starting at ₹{movie.price}</span>
            <p className="text-xs text-gray-500 mt-1">{movie.language}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Director</p>
            <p className="text-sm font-medium text-gray-700">{movie.director}</p>
          </div>
        </div>
        <button onClick={() => setSelectedMovie(movie)} className="shimmer-button w-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white py-3 px-4 rounded-2xl font-bold hover:from-fuchsia-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-fuchsia-500/25 relative overflow-hidden group">
          <span className="relative z-10 flex items-center justify-center gap-2">Book Tickets <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" /></span>
        </button>
      </div>
    </div>
  );

  // NEW: Language Selection Component
  const LanguageSelection = ({ languages }) => (
    <div className="p-8 animate-fadeIn">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Select Language</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {languages.map(lang => (
                <button 
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-110 ${
                        selectedLanguage === lang 
                        ? 'bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50' 
                        : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-100'
                    }`}
                >
                    {lang}
                </button>
            ))}
        </div>
    </div>
  );

  // Ticket Count Selection Component
  const TicketCountSelection = () => (
    <div className="p-8 animate-fadeIn">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">How many tickets?</h3>
        <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <button 
                    key={num}
                    onClick={() => setNumberOfTickets(num)}
                    className={`w-16 h-16 rounded-2xl font-bold text-2xl transition-all duration-300 transform hover:scale-110 ${
                        numberOfTickets === num 
                        ? 'bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50' 
                        : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-100'
                    }`}
                >
                    {num}
                </button>
            ))}
        </div>
    </div>
  );

  // Seat Selection Component
  const SeatSelection = ({ movie }) => {
    const seatLayout = {
        rows: 8,
        cols: 12,
        gaps: [3, 9],
        reserved: new Set(['1-5', '1-6', '3-2', '3-3', '4-7', '4-8', '6-4', '6-5', '6-6']),
        vipRows: [1, 2] // First two rows are VIP
    };

    const seats = [];
    for (let row = 1; row <= seatLayout.rows; row++) {
        for (let col = 1; col <= seatLayout.cols; col++) {
            const seatId = `${row}-${col}`;
            const isVip = seatLayout.vipRows.includes(row);
            seats.push({ 
                id: seatId, 
                row, 
                col, 
                isReserved: seatLayout.reserved.has(seatId), 
                isSelected: selectedSeats.has(seatId), 
                isGap: seatLayout.gaps.includes(col),
                isVip
            });
        }
    }
    
    const totalPrice = [...selectedSeats].reduce((total, seatId) => {
        const seat = seats.find(s => s.id === seatId);
        return total + (seat.isVip ? movie.price * 1.5 : movie.price);
    }, 0);

    return (
        <div className="p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold mb-2 text-gray-800 text-center">Choose Your Seats</h3>
            <p className="text-center text-gray-500 mb-6">Please select {numberOfTickets} seat{numberOfTickets > 1 && 's'}.</p>
            <div className="mb-8 perspective-1000">
                <div className="w-3/4 h-12 mx-auto bg-gray-200 border-t-4 border-gray-400 rounded-t-full transform rotate-x-45"></div>
                <p className="text-center text-sm text-gray-500 mt-2">Screen</p>
            </div>

            <div className="flex justify-center mb-8">
                <div className="grid gap-x-2 gap-y-3">
                    {Array.from({ length: seatLayout.rows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-4">
                            <span className="w-4 text-center font-semibold text-gray-500">{String.fromCharCode(65 + rowIndex)}</span>
                            <div className="flex gap-2">
                                {seats.filter(s => s.row === rowIndex + 1).map(seat => (
                                    <div key={seat.id} className={`${seat.isGap ? 'w-6' : 'w-8'}`}>
                                        {!seat.isGap && (
                                            <button
                                                onClick={() => !seat.isReserved && toggleSeat(seat.id)}
                                                disabled={seat.isReserved}
                                                className={`w-8 h-8 rounded-md transition-all duration-200 transform hover:scale-110
                                                    ${seat.isReserved ? 'bg-gray-400 cursor-not-allowed' : ''}
                                                    ${!seat.isReserved && !seat.isSelected && !seat.isVip ? 'bg-fuchsia-200 hover:bg-fuchsia-300' : ''}
                                                    ${!seat.isReserved && !seat.isSelected && seat.isVip ? 'bg-yellow-200 hover:bg-yellow-300' : ''}
                                                    ${seat.isSelected ? 'bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50' : ''}
                                                `}
                                            >
                                                <Armchair className={`w-5 h-5 mx-auto ${seat.isSelected ? 'text-white' : (seat.isVip ? 'text-yellow-700' : 'text-fuchsia-700')}`} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-8 mb-8 text-sm text-gray-600 flex-wrap">
                <div className="flex items-center gap-2"><div className="w-5 h-5 bg-fuchsia-200 rounded"></div><span>Regular</span></div>
                <div className="flex items-center gap-2"><div className="w-5 h-5 bg-yellow-200 rounded"></div><span>VIP</span></div>
                <div className="flex items-center gap-2"><div className="w-5 h-5 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded"></div><span>Selected</span></div>
                <div className="flex items-center gap-2"><div className="w-5 h-5 bg-gray-400 rounded"></div><span>Reserved</span></div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border animate-slideInUp">
                <h4 className="font-bold text-lg mb-4">Booking Summary</h4>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Selected Seats ({selectedSeats.size})</span>
                    <span className="font-semibold text-gray-800 text-right max-w-[50%] break-words">
                        {[...selectedSeats].map(s => {
                            const row = String.fromCharCode(64 + parseInt(s.split('-')[0]));
                            const col = s.split('-')[1];
                            return row + col;
                        }).join(', ')}
                    </span>
                </div>
                <div className="flex justify-between items-center font-bold text-xl">
                    <span className="text-gray-800">Total Price</span>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ₹{totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
  };

  // Payment Gateway Component
  const PaymentGateway = ({ movie, totalPrice }) => (
    <div className="p-8 animate-fadeIn">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Secure Payment</h3>
        <div className="bg-gray-50 p-6 rounded-2xl border mb-6">
            <div className="flex justify-between items-center font-bold text-xl">
                <span className="text-gray-800">Amount to Pay</span>
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ₹{totalPrice.toFixed(2)}
                </span>
            </div>
        </div>
        <form className="space-y-4">
            <div>
                <label className="font-semibold text-sm text-gray-600 mb-1 block">Card Number</label>
                <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-fuchsia-500 transition-colors" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-semibold text-sm text-gray-600 mb-1 block">Expiry Date</label>
                    <input type="text" placeholder="MM / YY" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-fuchsia-500 transition-colors" />
                </div>
                <div>
                    <label className="font-semibold text-sm text-gray-600 mb-1 block">CVV</label>
                    <input type="text" placeholder="123" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-fuchsia-500 transition-colors" />
                </div>
            </div>
             <div>
                <label className="font-semibold text-sm text-gray-600 mb-1 block">Cardholder Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-fuchsia-500 transition-colors" />
            </div>
        </form>
    </div>
  );

  // Booking Confirmation Component
  const BookingConfirmation = ({ movie, selectedShow, selectedSeats }) => (
    <div className="p-8 text-center animate-fadeIn">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-8">Your e-ticket has been sent to your email.</p>
        <div className="bg-gradient-to-br from-fuchsia-50 to-rose-50 p-6 rounded-2xl border text-left shadow-lg">
            <h4 className="font-bold text-xl mb-4 text-gray-800">{movie.title} ({selectedLanguage})</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">Theater</p>
                    <p className="font-semibold text-gray-700">{selectedShow.theater}</p>
                </div>
                 <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-semibold text-gray-700">Aug 18, 2025 at {selectedShow.time}</p>
                </div>
                <div>
                    <p className="text-gray-500">Seats</p>
                    <p className="font-semibold text-gray-700">{[...selectedSeats].map(s => {
                        const row = String.fromCharCode(64 + parseInt(s.split('-')[0]));
                        const col = s.split('-')[1];
                        return row + col;
                    }).join(', ')}</p>
                </div>
                <div>
                    <p className="text-gray-500">Screen</p>
                    <p className="font-semibold text-gray-700">Screen {Math.floor(Math.random() * 5) + 1}</p>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-dashed">
                <p className="text-center text-xs text-gray-500">Scan this QR code at the entrance</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=MovikoBooking" alt="QR Code" className="mx-auto mt-2" />
            </div>
        </div>
    </div>
  );

  // NEW: Theaters View Component
  const TheatersView = () => {
    const theaters = [
        { 
            name: 'PVR Cinemas', 
            logo: (
                <svg viewBox="0 0 200 100" className="h-12 w-auto">
                    <rect width="200" height="100" fill="#D91E25"/>
                    <text x="100" y="65" fontFamily="Arial, sans-serif" fontSize="60" fill="white" textAnchor="middle" fontWeight="bold">PVR</text>
                </svg>
            ),
            description: 'Experience the best in cinema with state-of-the-art sound and visuals. A premium movie-watching experience awaits.'
        },
        { 
            name: 'Cinepolis', 
            logo: (
                 <svg viewBox="0 0 200 100" className="h-12 w-auto">
                    <rect width="200" height="100" fill="#0072BC"/>
                    <text x="100" y="65" fontFamily="Verdana, sans-serif" fontSize="45" fill="white" textAnchor="middle" fontWeight="bold">Cinépolis</text>
                </svg>
            ),
            description: 'Enjoy a world-class cinema experience with luxurious seating and a wide variety of food and beverage options.'
        },
        { 
            name: 'Big Cinemas', 
            logo: (
                <svg viewBox="0 0 200 100" className="h-12 w-auto">
                    <rect width="200" height="100" fill="#F37021"/>
                    <text x="100" y="70" fontFamily="Impact, sans-serif" fontSize="50" fill="white" textAnchor="middle" letterSpacing="2">BIG</text>
                    <text x="100" y="35" fontFamily="Impact, sans-serif" fontSize="20" fill="white" textAnchor="middle">CINEMAS</text>
                </svg>
            ),
            description: 'Entertainment for everyone. Big screens, big sound, and big experiences at affordable prices.'
        },
    ];

    return (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Cinema Partners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {theaters.map((theater, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <div className="p-6 bg-gray-50 flex items-center justify-center">
                            {theater.logo}
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{theater.name}</h3>
                            <p className="text-gray-600 leading-relaxed">{theater.description}</p>
                        </div>
                         <div className="p-6 pt-0">
                             <button className="w-full bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-700 py-3 px-4 rounded-2xl font-bold hover:from-fuchsia-200 hover:to-rose-200 transition-all duration-300">
                                View Showtimes
                             </button>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  // Modal for movie booking details
  const BookingModal = ({ movie, onClose }) => {
    const totalPrice = [...selectedSeats].reduce((total, seatId) => {
        const seat = { isVip: [1,2].includes(parseInt(seatId.split('-')[0])) };
        return total + (seat.isVip ? movie.price * 1.5 : movie.price);
    }, 0);
    
    const hasLanguageStep = movie?.languages?.length > 0;

    const renderStepContent = () => {
        let currentStep = bookingStep;
        if (hasLanguageStep) {
            if (currentStep === 1) return <LanguageSelection languages={movie.languages} />;
            if (currentStep === 2) return <TicketCountSelection />;
            if (currentStep === 3) return (
                <div className="p-8">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Select a Showtime</h3>
                    <div className="space-y-4">
                        {movie.showtimesByTheater.map((show, index) => (
                            <div key={index} className="border-2 rounded-2xl p-6 transition-all duration-300 bg-white shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <div className="font-bold text-lg text-gray-800">{show.theater}</div>
                                        <div className="text-sm text-gray-500">Premium Experience • Dolby Atmos</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{movie.price}</span>
                                        <div className="text-xs text-gray-500">per seat</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {show.times.map((time, timeIndex) => (
                                        <button 
                                            key={timeIndex} 
                                            onClick={() => setSelectedShow({ theater: show.theater, time: time })} 
                                            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedShow?.theater === show.theater && selectedShow?.time === time ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-lg shadow-fuchsia-500/30' : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-fuchsia-100 hover:to-rose-100 hover:text-fuchsia-700'}`}>
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            if (currentStep === 4) return <SeatSelection movie={movie} />;
            if (currentStep === 5) return <PaymentGateway movie={movie} totalPrice={totalPrice} />;
            if (currentStep === 6) return <BookingConfirmation movie={movie} selectedShow={selectedShow} selectedSeats={selectedSeats} selectedLanguage={selectedLanguage} />;
        } else {
            if (currentStep === 1) return <TicketCountSelection />;
            if (currentStep === 2) return (
                 <div className="p-8">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">Select a Showtime</h3>
                    <div className="space-y-4">
                        {movie.showtimesByTheater.map((show, index) => (
                            <div key={index} className="border-2 rounded-2xl p-6 transition-all duration-300 bg-white shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <div className="font-bold text-lg text-gray-800">{show.theater}</div>
                                        <div className="text-sm text-gray-500">Premium Experience • Dolby Atmos</div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{movie.price}</span>
                                        <div className="text-xs text-gray-500">per seat</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {show.times.map((time, timeIndex) => (
                                        <button 
                                            key={timeIndex} 
                                            onClick={() => setSelectedShow({ theater: show.theater, time: time })} 
                                            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedShow?.theater === show.theater && selectedShow?.time === time ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-lg shadow-fuchsia-500/30' : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-fuchsia-100 hover:to-rose-100 hover:text-fuchsia-700'}`}>
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
            if (currentStep === 3) return <SeatSelection movie={movie} />;
            if (currentStep === 4) return <PaymentGateway movie={movie} totalPrice={totalPrice} />;
            if (currentStep === 5) return <BookingConfirmation movie={movie} selectedShow={selectedShow} selectedSeats={selectedSeats} selectedLanguage={movie.language} />;
        }
    };

    const maxSteps = hasLanguageStep ? 6 : 5;

    const isNextDisabled = () => {
        if (hasLanguageStep) {
            if (bookingStep === 1) return !selectedLanguage;
            if (bookingStep === 2) return numberOfTickets === 0;
            if (bookingStep === 3) return !selectedShow;
            if (bookingStep === 4) return selectedSeats.size !== numberOfTickets;
        } else {
            if (bookingStep === 1) return numberOfTickets === 0;
            if (bookingStep === 2) return !selectedShow;
            if (bookingStep === 3) return selectedSeats.size !== numberOfTickets;
        }
        return false;
    };
    
    const getButtonText = () => {
        if (hasLanguageStep) {
            switch(bookingStep) {
                case 1: return 'Select Tickets';
                case 2: return 'Select Showtime';
                case 3: return 'Select Seats';
                case 4: return 'Proceed to Payment';
                case 5: return 'Pay Now';
                default: return 'Next';
            }
        } else {
             switch(bookingStep) {
                case 1: return 'Select Showtime';
                case 2: return 'Select Seats';
                case 3: return 'Proceed to Payment';
                case 4: return 'Pay Now';
                default: return 'Next';
            }
        }
    };

    return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-slideInUp">
        <div className="relative h-60 overflow-hidden">
          <img src={movie.backdrop || movie.image} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
          <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gray-300 bg-black/50 backdrop-blur-sm rounded-2xl p-3 hover:bg-black/70 transition-all duration-300 hover:scale-110">
            <X className="w-6 h-6" />
          </button>
          <div className="absolute bottom-8 left-8 text-white max-w-2xl">
            <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
             {selectedShow && <p className="font-semibold">{selectedShow.theater} - {selectedShow.time}</p>}
          </div>
        </div>

        {renderStepContent()}

        {bookingStep < maxSteps && (
            <div className="flex gap-4 p-8 pt-4 border-t border-gray-200 mt-4">
                <button onClick={bookingStep === 1 ? onClose : () => setBookingStep(bookingStep - 1)} className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-bold hover:bg-gray-300 transition-all duration-300">
                    {bookingStep === 1 ? 'Cancel' : 'Back'}
                </button>
                <button
                    onClick={() => setBookingStep(bookingStep + 1)}
                    disabled={isNextDisabled()}
                    className={`flex-1 py-4 px-8 rounded-2xl font-bold transition-all duration-300 shadow-xl relative overflow-hidden group shimmer-button ${
                        !isNextDisabled()
                            ? 'bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white hover:from-fuchsia-700 hover:to-rose-700 transform hover:scale-105 shadow-fuchsia-500/25'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {getButtonText()}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                </button>
            </div>
        )}
        {bookingStep === maxSteps && (
            <div className="p-8 pt-4 text-center">
                 <button onClick={onClose} className="w-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white py-4 px-8 rounded-2xl font-bold hover:from-fuchsia-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                    Done
                 </button>
            </div>
        )}
      </div>
    </div>
  )};

  // Mobile menu component for small screens
  const MobileMenu = () => (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`fixed top-0 left-0 w-64 h-full bg-white/95 backdrop-blur-xl shadow-2xl p-6 transform transition-transform duration-500 ease-in-out ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="font-bold text-xl text-gray-900">MOVIKO</div>
          <button onClick={() => setShowMobileMenu(false)} className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"><X className="w-6 h-6" /></button>
        </div>
        <nav className="space-y-2 mb-6">
          {[{ key: 'movies', label: 'Movies', icon: Play }, { key: 'theaters', label: 'Theaters', icon: MapPin }, { key: 'events', label: 'Events', icon: Calendar }].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => { setActiveTab(key); setShowMobileMenu(false); }} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center gap-4 ${activeTab === key ? 'bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              <Icon className="w-5 h-5" />{label}
            </button>
          ))}
        </nav>
        <div className="space-y-2 mb-6 border-t pt-6">
          <div className="text-gray-500 font-medium px-4 mb-2">My Account</div>
          <button className="w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center gap-4 text-gray-700 hover:bg-gray-100"><User className="w-5 h-5" /> Profile</button>
          <button className="w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center gap-4 text-gray-700 hover:bg-gray-100"><Settings className="w-5 h-5" /> Settings</button>
          <button className="w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center gap-4 text-gray-700 hover:bg-gray-100"><LogOut className="w-5 h-5" /> Sign Out</button>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .shimmer-button {
            position: relative;
            overflow: hidden;
        }
        .shimmer-button::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent);
            transform: rotate(30deg);
            transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.3, 1);
        }
        .shimmer-button:hover::after {
            transform: translate(30%, -10%) rotate(30deg);
        }
        .perspective-1000 {
            perspective: 1000px;
        }
        .rotate-x-45 {
            transform: rotateX(45deg);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50 to-fuchsia-50 font-['Inter',_sans-serif] text-gray-800">
        <header className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4 animate-slideInLeft">
                <div className="relative">
                  <svg width="56" height="56" viewBox="0 0 100 100" className="transform hover:scale-110 transition-all duration-300 drop-shadow-2xl">
                    <path d="M15 20 C15 15, 20 10, 25 10 L75 10 C80 10, 85 15, 85 20 L85 35 C82 35, 80 37, 80 40 C80 43, 82 45, 85 45 L85 80 C85 85, 80 90, 75 90 L25 90 C20 90, 15 85, 15 80 L15 45 C18 45, 20 43, 20 40 C20 37, 18 35, 15 35 Z" fill="#EF4444" className="drop-shadow-lg"/>
                    <polygon points="35,30 35,50 50,40" fill="white" className="drop-shadow-sm"/>
                  </svg>
                  <div className="absolute -inset-2 bg-red-400 rounded-2xl opacity-20 animate-pulse"></div>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900 tracking-wide">MOVIKO</span>
                  <div className="text-xs text-gray-500 font-medium">Book Tickets Faster, Anytime, Anywhere</div>
                </div>
              </div>
              <nav className="hidden md:flex space-x-1 animate-slideInUp bg-gray-100/50 backdrop-blur-sm rounded-2xl p-1" style={{ animationDelay: '0.2s' }}>
                {[{ key: 'movies', label: 'Movies', icon: Play }, { key: 'theaters', label: 'Theaters', icon: MapPin }, { key: 'events', label: 'Events', icon: Calendar }].map(({ key, label, icon: Icon }) => (
                  <button key={key} onClick={() => setActiveTab(key)} className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${activeTab === key ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-lg shadow-fuchsia-500/30' : 'text-gray-600 hover:text-gray-800 hover:bg-white/70'}`}>
                    <Icon className="w-4 h-4" />{label}
                  </button>
                ))}
              </nav>
              <div className="flex items-center space-x-4 animate-slideInRight">
                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="hidden sm:block bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-fuchsia-500 focus:bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  {cities.map(city => (<option key={city} value={city}>{city}</option>))}
                </select>
                <button className="p-3 text-gray-600 hover:text-gray-800 rounded-2xl hover:bg-white/70 transition-all duration-300 transform hover:scale-110 relative">
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </button>
                <div className="relative hidden md:block">
                  <button onClick={() => setShowUserMenu(!showUserMenu)} className="p-3 bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white rounded-2xl hover:from-fuchsia-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
                    <User className="w-5 h-5" />
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 animate-slideDown">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-800">John Doe</p>
                        <p className="text-sm text-gray-500">Premium Member</p>
                      </div>
                      <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"><User className="w-5 h-5" /> Profile</a>
                      <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"><Settings className="w-5 h-5" /> Settings</a>
                      <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"><LogOut className="w-5 h-5" /> Sign Out</a>
                    </div>
                  )}
                </div>
                <button onClick={() => setShowMobileMenu(true)} className="p-3 md:hidden text-gray-600 hover:text-gray-800 rounded-2xl hover:bg-white/70 transition-all duration-300">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {activeTab === 'movies' && (
            <>
                <HeroSection />
                <div className="mt-12">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
                        <div className="relative w-full sm:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="Search for movies, genres, or cast..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-white/80 backdrop-blur-sm rounded-2xl py-4 pl-12 pr-4 text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-lg" />
                        </div>
                        <div className="flex flex-wrap justify-center sm:justify-end gap-3">
                        {genres.map(genre => (
                            <button key={genre} onClick={() => setSelectedGenre(genre)} className={`px-5 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${selectedGenre === genre ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-lg shadow-fuchsia-500/30' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                            {genre}
                            </button>
                        ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie, index) => (<MovieCard key={movie.id} movie={movie} index={index} />))
                        ) : (
                        <div className="col-span-full text-center py-20 text-gray-500 text-lg">No movies found for your search.</div>
                        )}
                    </div>
                </div>
            </>
          )}
          {activeTab === 'theaters' && <TheatersView />}
          {activeTab === 'events' && (<div className="text-center py-20 text-gray-500 text-lg">Events and shows content will be displayed here.</div>)}
        </main>

        {selectedMovie && (<BookingModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />)}
        {watchingTrailer && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" onClick={() => setWatchingTrailer(null)}>
                <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setWatchingTrailer(null)} className="absolute -top-10 right-0 text-white text-4xl">&times;</button>
                    <iframe
                        className="w-full h-full rounded-2xl"
                        src={watchingTrailer}
                        title="Movie Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        )}
        <MobileMenu />
      </div>
    </>
  );
};

export default App;
