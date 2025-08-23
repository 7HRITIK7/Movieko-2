import React, { useState, useEffect, useMemo } from 'react';
import { Search, MapPin, Calendar, Clock, Star, Play, User, Menu, X, ChevronRight, Zap, Award, Users, TrendingUp, Gift, Bell, Armchair, ArrowRight, Ticket, Mail, Phone, CreditCard, Sparkles, Percent, LoaderCircle } from 'lucide-react';
import axios from 'axios';

// The backend server URL
const API_URL = 'http://localhost:5000/api';

// --- Helper Components ---

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
                    <path d="M15 20 C15 15, 20 10, 25 10 L75 10 C80 10, 85 15, 85 20 L85 35 C82 35, 80 37, 80 40 C80 43, 82 45, 85 45 L85 80 C85 85, 80 90, 75 90 L25 90 C20 90, 15 85, 15 80 L15 45 C18 45, 20 43, 20 40 C20 37, 18 35, 15 35 Z" fill="#EF4444" className="drop-shadow-lg" />
                    <polygon points="35,30 35,50 50,40" fill="white" className="drop-shadow-sm" />
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

const HeroSection = ({ heroSlides, currentSlide, setCurrentSlide, setSelectedMovie, setWatchingTrailer }) => (
    <div className="relative h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
        {heroSlides.map((slide, index) => (
            <div key={slide.movie.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
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

const MovieCard = ({ movie, index, setSelectedMovie, setWatchingTrailer }) => (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl hover:shadow-fuchsia-500/20 animate-slideInUp border border-gray-100" style={{ animationDelay: `${index * 0.1}s` }}>
        <div className="relative overflow-hidden">
            <img src={movie.image} alt={movie.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
                {movie.newRelease && (<span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">NEW</span>)}
                {movie.trending && (<span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"><TrendingUp className="w-3 h-3" /> TRENDING</span>)}
                {movie.awards > 0 && (<span className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1"><Award className="w-3 h-3" /> {movie.awards} AWARDS</span>)}
            </div>
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl flex items-center gap-1 animate-fadeIn shadow-xl">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                <span className="text-sm font-bold">{movie.rating}</span>
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

const LanguageSelection = ({ languages, selectedLanguage, setSelectedLanguage }) => (
    <div className="p-8 animate-fadeIn">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Select Language</h3>
        <div className="flex flex-wrap justify-center gap-4">
            {languages && languages.map(lang => (
                <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-110 ${selectedLanguage === lang
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

const TicketCountSelection = ({ numberOfTickets, setNumberOfTickets }) => (
    <div className="p-8 animate-fadeIn">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">How many tickets?</h3>
        <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <button
                    key={num}
                    onClick={() => setNumberOfTickets(num)}
                    className={`w-16 h-16 rounded-2xl font-bold text-2xl transition-all duration-300 transform hover:scale-110 ${numberOfTickets === num
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

const DateSelection = ({ selectedDate, setSelectedDate }) => {
    const dates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return date;
    });

    return (
        <div className="p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Select Date</h3>
            <div className="flex justify-center gap-3 overflow-x-auto pb-2">
                {dates.map(date => (
                    <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`flex-shrink-0 p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 w-20 ${selectedDate.toDateString() === date.toDateString()
                                ? 'bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50'
                                : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-100'
                            }`}
                    >
                        <div className="font-bold text-lg">{date.toLocaleDateString('en-US', { day: 'numeric' })}</div>
                        <div className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    </button>
                ))}
            </div>
        </div>
    )
}

const ShowtimeSelection = ({ showtimes, selectedShow, setSelectedShow }) => {
    // Group showtimes by theater
    const showtimesByTheater = useMemo(() => {
        const grouped = {};
        if (showtimes && showtimes.length > 0) {
            showtimes.forEach(show => {
                const theaterName = show.theater_id.name;
                if (!grouped[theaterName]) {
                    grouped[theaterName] = {
                        theater: theaterName,
                        showtimes: []
                    };
                }
                grouped[theaterName].showtimes.push(show);
            });
        }
        return Object.values(grouped);
    }, [showtimes]);

    return (
        <div className="p-8 animate-fadeIn">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Select a Showtime</h3>
            {showtimes.length === 0 && (
                <div className="p-8 text-center">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">No Showtimes Available</h3>
                    <p className="text-gray-600">There are currently no showtimes listed for this movie on the selected date.</p>
                </div>
            )}
            <div className="space-y-4">
                {showtimesByTheater.map((group, index) => (
                    <div key={index} className="border-2 rounded-2xl p-6 transition-all duration-300 bg-white shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="font-bold text-lg text-gray-800">{group.theater}</div>
                                <div className="text-sm text-gray-500">Screen {group.showtimes[0].screen_number} • Premium Experience • Dolby Atmos</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {group.showtimes.map((show, showIndex) => (
                                <button
                                    key={showIndex}
                                    onClick={() => setSelectedShow(show)}
                                    className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${selectedShow?._id === show._id ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-lg shadow-fuchsia-500/30' : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-fuchsia-100 hover:to-rose-100 hover:text-fuchsia-700'}`}>
                                    {show.show_time}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SeatSelection = ({ numberOfTickets, seatLayout, selectedSeats, toggleSeat, totalPrice }) => {
    const seats = useMemo(() => {
        const allSeats = [];
        for (let row = 1; row <= seatLayout.rows; row++) {
            for (let col = 1; col <= seatLayout.cols; col++) {
                const seatId = `${row}-${col}`;
                const isVip = seatLayout.vipRows.includes(row);
                allSeats.push({
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
        return allSeats;
    }, [seatLayout, selectedSeats]);

    return (
        <div className="p-4 sm:p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold mb-2 text-gray-800 text-center">Choose Your Seats</h3>
            <p className="text-center text-gray-500 mb-6">Please select {numberOfTickets} seat{numberOfTickets > 1 && 's'}.</p>
            <div className="mb-8 perspective-1000">
                <div className="w-3/4 h-12 mx-auto bg-gray-200 border-t-4 border-gray-400 rounded-t-full transform rotate-x-45"></div>
                <p className="text-center text-sm text-gray-500 mt-2">Screen</p>
            </div>

            <div className="flex justify-center mb-8 overflow-x-auto">
                <div className="grid gap-x-1 sm:gap-x-2 gap-y-3">
                    {Array.from({ length: seatLayout.rows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex items-center gap-2 sm:gap-4">
                            <span className="w-4 text-center font-semibold text-gray-500">{String.fromCharCode(65 + rowIndex)}</span>
                            <div className="flex gap-1 sm:gap-2">
                                {seats.filter(s => s.row === rowIndex + 1).map(seat => (
                                    <div key={seat.id} className={`${seat.isGap ? 'w-4 sm:w-6' : 'w-7 sm:w-8'}`}>
                                        {!seat.isGap && (
                                            <button
                                                onClick={() => !seat.isReserved && toggleSeat(seat.id)}
                                                disabled={seat.isReserved}
                                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md transition-all duration-200 transform hover:scale-110
                                                ${seat.isReserved ? 'bg-gray-400 cursor-not-allowed' : ''}
                                                ${!seat.isReserved && !seat.isSelected && !seat.isVip ? 'bg-fuchsia-200 hover:bg-fuchsia-300' : ''}
                                                ${!seat.isReserved && !seat.isSelected && seat.isVip ? 'bg-yellow-200 hover:bg-yellow-300' : ''}
                                                ${seat.isSelected ? 'bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/50' : ''}
                                            `}
                                            >
                                                <Armchair className={`w-4 h-4 sm:w-5 sm:h-5 mx-auto ${seat.isSelected ? 'text-white' : (seat.isVip ? 'text-yellow-700' : 'text-fuchsia-700')}`} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 sm:gap-8 mb-8 text-sm text-gray-600 flex-wrap">
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
                <div className="flex justify-between items-center font-bold text-xl mt-4">
                    <span className="text-gray-800">Total Price</span>
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        ₹{totalPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
};

const ContactDetails = ({ contactEmail, setContactEmail, contactPhone, setContactPhone }) => {
    return (
        <div className="p-8 animate-fadeIn">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Contact Details</h3>
            <form className="space-y-4">
                <div>
                    <label className="font-semibold text-sm text-gray-600 mb-1 block">Your Email</label>
                    <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" placeholder="XXXXXXXX@gmail.com" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-fuchsia-500" />
                    <p className="text-xs text-gray-500 mt-1">To access the ticket(s) on other devices, Login with this E-mail</p>
                </div>
                <div>
                    <label className="font-semibold text-sm text-gray-600 mb-1 block">Phone number</label>
                    <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} type="tel" placeholder="eg: 91480XXXXX" className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-fuchsia-500" />
                    <p className="text-xs text-gray-500 mt-1">This Number will only be used for sending ticket(s)</p>
                </div>
            </form>
        </div>
    )
}

const BookingConfirmation = ({ movie, selectedShow, selectedSeats, selectedDate, numberOfTickets, totalPrice }) => {
    return (
        <div className="p-4 sm:p-8 animate-fadeIn relative overflow-hidden bg-gray-50">
            <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Mobile Ticket</h2>
                <p className="text-gray-600 text-md">Once you buy a movie ticket simply scan the barcode to access to your movie.</p>
            </div>

            <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden my-8 transform transition-all duration-500 hover:scale-105 relative z-10 ticket-design">
                <div className="relative">
                    <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{movie.title}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                            <p className="text-gray-500">Date</p>
                            <p className="font-semibold text-gray-800">{selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Time</p>
                            <p className="font-semibold text-gray-800">{selectedShow.show_time}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Screen</p>
                            <p className="font-semibold text-gray-800">{selectedShow.screen_number}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Tickets</p>
                            <p className="font-semibold text-gray-800">{numberOfTickets}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Row</p>
                            <p className="font-semibold text-gray-800">{[...selectedSeats].map(s => String.fromCharCode(64 + parseInt(s.split('-')[0]))).join(', ')}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Seats</p>
                            <p className="font-semibold text-gray-800">{[...selectedSeats].map(s => s.split('-')[1]).join(', ')}</p>
                        </div>
                        <div className="col-span-2 border-t pt-4">
                            <p className="text-gray-500">Total Price</p>
                            <p className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{totalPrice.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className="border-t-2 border-dashed border-gray-300 pt-4">
                        <img src="https://barcode.tec-it.com/barcode.ashx?data=MovikoBooking12345&code=Code128&dpi=96" alt="Barcode" className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const OffersView = () => {
    const offers = [
        { title: "Flat ₹100 Off", description: "Use code MOVIKO100 on your next booking.", code: "MOVIKO100", type: "Discount", icon: <Ticket className="w-8 h-8" />, color: "from-blue-500 to-indigo-600" },
        { title: "HDFC Bank Offer", description: "Get 25% off up to ₹150 on HDFC Bank Credit Cards.", type: "Bank Offer", icon: <CreditCard className="w-8 h-8" />, color: "from-red-500 to-rose-600" },
        { title: "Buy 1 Get 1 Free", description: "On weekends with ICICI Bank Debit Cards.", type: "BOGO", icon: <Users className="w-8 h-8" />, color: "from-amber-500 to-orange-600" },
        { title: "Paytm Cashback", description: "Get up to ₹200 cashback when you pay with Paytm Wallet.", type: "Cashback", icon: <Gift className="w-8 h-8" />, color: "from-sky-500 to-cyan-600" },
        { title: "First Time User?", description: "Get a flat 50% discount on your first ever booking with us!", code: "NEWBIE50", type: "Discount", icon: <Sparkles className="w-8 h-8" />, color: "from-fuchsia-500 to-pink-600" },
        { title: "Student Discount", description: "15% off on all tickets. Show your student ID at the cinema.", type: "Discount", icon: <Award className="w-8 h-8" />, color: "from-green-500 to-emerald-600" },
    ];

    return (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Deals & Offers</h2>
            <p className="text-gray-600 mb-8">Save big on your next movie outing with these exclusive offers!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offers.map((offer, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
                        <div className={`p-6 text-white bg-gradient-to-br ${offer.color} flex justify-between items-center`}>
                            <div className="transform group-hover:scale-110 transition-transform duration-300">{offer.icon}</div>
                            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">{offer.type}</span>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{offer.title}</h3>
                            <p className="text-gray-600 leading-relaxed mb-4">{offer.description}</p>
                            {offer.code && (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                                    <span className="text-gray-500 text-sm">Use Code: </span>
                                    <span className="font-bold text-gray-800 tracking-widest">{offer.code}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const MyBookingsView = ({ bookingEmail, setBookingEmail, handleFetchBookings, userBookings, isBookingLoading, bookingError }) => {
    return (
        <div className="animate-fadeIn">
            <div className="text-center mb-12">
                <Ticket className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Find Your Bookings</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Enter the email address you used to book your tickets, and we'll find them for you.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="relative w-full sm:max-w-md">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            className="w-full bg-white/80 backdrop-blur-sm rounded-2xl py-4 pl-12 pr-4 text-sm font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-lg"
                        />
                    </div>
                    <button
                        onClick={handleFetchBookings}
                        disabled={isBookingLoading}
                        className="shimmer-button px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white rounded-2xl font-bold hover:from-fuchsia-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isBookingLoading ? <LoaderCircle className="animate-spin w-5 h-5 mr-2" /> : <Search className="w-5 h-5 mr-2" />}
                        {isBookingLoading ? 'Searching...' : 'Find Bookings'}
                    </button>
                </div>
            </div>

            {bookingError && <div className="text-center py-4 text-red-600 bg-red-100 rounded-2xl">{bookingError}</div>}

            {userBookings.length > 0 && (
                <div className="space-y-8">
                    {userBookings.map(booking => (
                        <div key={booking._id} className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden ticket-stub">
                            <div className="md:w-1/3 p-6 flex flex-col items-center justify-center text-center bg-gray-50">
                                <img src={booking.showtime.movie.poster_url} alt={booking.showtime.movie.title} className="w-40 rounded-lg shadow-lg mb-4"/>
                                <h3 className="text-2xl font-bold text-gray-800">{booking.showtime.movie.title}</h3>
                            </div>
                            <div className="flex-grow p-6">
                                <h4 className="text-xl font-bold text-gray-800 mb-4">{booking.showtime.theater.name}</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm mb-4">
                                    <div>
                                        <p className="text-gray-500">Date</p>
                                        <p className="font-semibold text-gray-800">{new Date(booking.showtime.start_time).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Time</p>
                                        <p className="font-semibold text-gray-800">{new Date(booking.showtime.start_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Screen</p>
                                        <p className="font-semibold text-gray-800">{booking.showtime.screen_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Tickets</p>
                                        <p className="font-semibold text-gray-800">{booking.seats.length}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-500">Seats</p>
                                        <p className="font-semibold text-gray-800">{booking.seats.join(', ')}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Total Price</p>
                                        <p className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">₹{booking.total_price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                                    <img src={`https://barcode.tec-it.com/barcode.ashx?data=${booking._id}&code=Code128&dpi=96`} alt="Barcode" className="w-full max-w-sm mx-auto" />
                                    <p className="text-center text-xs text-gray-500 mt-2">Booking ID: {booking._id}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const ComingSoonView = ({ movies }) => {
    const comingSoonMovies = movies.filter(m => m.status === 'coming-soon');

    return (
        <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-gray-600 mb-8">Get ready for the next wave of blockbusters hitting the screens!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {comingSoonMovies.length > 0 ? comingSoonMovies.map((movie, index) => (
                    <div key={movie.id} className="bg-white rounded-3xl shadow-2xl overflow-hidden group relative">
                        <img src={movie.backdrop} alt={movie.title} className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8 text-white">
                            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase">{movie.genre}</span>
                            <h3 className="text-4xl font-extrabold my-3 drop-shadow-lg">{movie.title}</h3>
                            <p className="text-gray-200 mb-4 line-clamp-2">{movie.description}</p>
                            <div className="font-semibold text-amber-400 mb-6">
                                Releasing on: {movie.releaseDate}
                            </div>
                            <button className="w-full bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white py-3 px-4 rounded-2xl font-bold hover:from-fuchsia-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center justify-center gap-2">
                                <Bell className="w-5 h-5" /> Notify Me
                            </button>
                        </div>
                    </div>
                )) : <p className="col-span-full text-center text-gray-500">No upcoming movies announced yet.</p>}
            </div>
        </div>
    );
};


const TheatersView = () => {
    const theaters = [
        {
            name: 'PVR Cinemas',
            logo: (
                <svg viewBox="0 0 200 100" className="h-12 w-auto">
                    <rect width="200" height="100" fill="#D91E25" />
                    <text x="100" y="65" fontFamily="Arial, sans-serif" fontSize="60" fill="white" textAnchor="middle" fontWeight="bold">PVR</text>
                </svg>
            ),
            description: 'Experience the best in cinema with state-of-the-art sound and visuals. A premium movie-watching experience awaits.'
        },
        {
            name: 'Cinepolis',
            logo: (
                <svg viewBox="0 0 200 100" className="h-12 w-auto">
                    <rect width="200" height="100" fill="#0072BC" />
                    <text x="100" y="65" fontFamily="Verdana, sans-serif" fontSize="45" fill="white" textAnchor="middle" fontWeight="bold">Cinépolis</text>
                </svg>
            ),
            description: 'Enjoy a world-class cinema experience with luxurious seating and a wide variety of food and beverage options.'
        },
        {
            name: 'INOX',
            logo: (
                <svg viewBox="0 0 200 100" className="h-12 w-auto">
                    <rect width="200" height="100" fill="#ffffff"/>
                    <text x="100" y="70" fontFamily="Arial, sans-serif" fontSize="60" fill="#0073e6" textAnchor="middle" fontWeight="bold">INOX</text>
                </svg>
            ),
            description: 'A modern cinema experience with cutting-edge technology and a commitment to guest satisfaction.'
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
        {
            name: 'Laxmi Pride',
            logo: (
                <svg viewBox="0 0 200 100" className="h-12 w-auto">
                    <rect width="200" height="100" fill="#8B0000"/>
                    <text x="100" y="65" fontFamily="Georgia, serif" fontSize="40" fill="gold" textAnchor="middle" fontWeight="bold">Laxmi Pride</text>
                </svg>
            ),
            description: 'Your neighborhood cinema for a comfortable and enjoyable movie experience with the whole family.'
        }
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

const BookingModal = ({ 
    movie, 
    onClose, 
    bookingStep, setBookingStep,
    selectedDate, setSelectedDate,
    numberOfTickets, setNumberOfTickets,
    selectedLanguage, setSelectedLanguage,
    selectedShow, setSelectedShow,
    selectedSeats, setSelectedSeats,
    contactEmail, setContactEmail,
    contactPhone, setContactPhone,
    toggleSeat
}) => {
    const seatLayout = useMemo(() => ({
        rows: 8,
        cols: 12,
        gaps: [3, 9],
        reserved: new Set(['1-5', '1-6', '3-2', '3-3', '4-7', '4-8', '6-4', '6-5', '6-6']),
        vipRows: [1, 2]
    }), []);

    // State for showtimes fetched from the server
    const [showtimes, setShowtimes] = useState([]);
    const [isFetchingShowtimes, setIsFetchingShowtimes] = useState(false);

    // Fetch showtimes from the server when movie or date changes
    useEffect(() => {
        const fetchShowtimes = async () => {
            if (!movie || !selectedDate) return;
            setIsFetchingShowtimes(true);
            try {
                // Format the date to a simple YYYY-MM-DD string
                const dateString = selectedDate.toISOString().split('T')[0];
                const response = await axios.get(`${API_URL}/showtimes/${movie.id}/${dateString}`);
                setShowtimes(response.data);
            } catch (err) {
                console.error("Error fetching showtimes:", err);
                setShowtimes([]);
            } finally {
                setIsFetchingShowtimes(false);
            }
        };

        fetchShowtimes();
    }, [movie, selectedDate]);

    const totalPrice = useMemo(() => {
        if (!selectedShow) return 0;
        const basePrice = selectedShow.price ?? movie.price;
        if (typeof basePrice !== 'number') {
            console.error("Could not determine base price for calculation.", { selectedShow, movie });
            return 0;
        }
        return [...selectedSeats].reduce((total, seatId) => {
            const row = parseInt(seatId.split('-')[0]);
            const isVip = seatLayout.vipRows.includes(row);
            const seatPrice = isVip ? basePrice * 1.5 : basePrice;
            return total + seatPrice;
        }, 0);
    }, [selectedSeats, seatLayout, selectedShow, movie.price]);

    const handleConfirmBooking = async () => {
         if (!selectedShow) {
            console.error("Cannot confirm booking without a selected showtime.");
            return;
        }
        try {
            const bookingData = {
                user_email: contactEmail,
                user_phone: contactPhone,
                // --- EDITED: Use the real showtime_id from the selected show ---
                showtime_id: selectedShow._id, 
                seats: Array.from(selectedSeats),
                total_price: totalPrice,
            };
            
            const response = await axios.post(`${API_URL}/bookings`, bookingData);
            console.log('Booking successful:', response.data);
            
            setBookingStep(bookingStep + 1);

        } catch (err) {
            console.error("Booking failed:", err);
            // You could show an error message to the user here
        }
    };

    const hasLanguageStep = movie?.languages?.length > 0;

    const renderStepContent = () => {
        let currentStep = bookingStep;
        
        const dateSelectionStep = hasLanguageStep ? 2 : 1;
        const ticketCountStep = hasLanguageStep ? 3 : 2;
        const showtimeSelectionStep = hasLanguageStep ? 4 : 3;
        const seatSelectionStep = hasLanguageStep ? 5 : 4;
        const contactStep = hasLanguageStep ? 6 : 5;
        const confirmationStep = hasLanguageStep ? 7 : 6;

        if (currentStep === 1 && hasLanguageStep) return <LanguageSelection languages={movie.languages} selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />;
        if (currentStep === dateSelectionStep) return <DateSelection selectedDate={selectedDate} setSelectedDate={setSelectedDate} />;
        if (currentStep === ticketCountStep) return <TicketCountSelection numberOfTickets={numberOfTickets} setNumberOfTickets={setNumberOfTickets} />;
        if (currentStep === showtimeSelectionStep) return <ShowtimeSelection showtimes={showtimes} selectedShow={selectedShow} setSelectedShow={setSelectedShow} isFetchingShowtimes={isFetchingShowtimes} />;
        if (currentStep === seatSelectionStep) return <SeatSelection numberOfTickets={numberOfTickets} seatLayout={seatLayout} selectedSeats={selectedSeats} toggleSeat={toggleSeat} totalPrice={totalPrice} />;
        if (currentStep === contactStep) return <ContactDetails contactEmail={contactEmail} setContactEmail={setContactEmail} contactPhone={contactPhone} setContactPhone={setContactPhone} />;
        if (currentStep === confirmationStep) return <BookingConfirmation movie={movie} selectedShow={selectedShow} selectedSeats={selectedSeats} selectedLanguage={selectedLanguage || movie.language} selectedDate={selectedDate} numberOfTickets={numberOfTickets} totalPrice={totalPrice} />;
    };

    const maxSteps = hasLanguageStep ? 7 : 6;

    const isNextDisabled = () => {
        const isShowtimeStep = bookingStep === (hasLanguageStep ? 4 : 3);
        if (isShowtimeStep && showtimes.length === 0) {
            return true;
        }
        if (hasLanguageStep) {
            if (bookingStep === 1) return !selectedLanguage;
            if (bookingStep === 2) return !selectedDate;
            if (bookingStep === 3) return numberOfTickets === 0;
            if (bookingStep === 4) return !selectedShow;
            if (bookingStep === 5) return selectedSeats.size !== numberOfTickets;
            if (bookingStep === 6) return !contactEmail || !contactPhone;
        } else {
            if (bookingStep === 1) return !selectedDate;
            if (bookingStep === 2) return numberOfTickets === 0;
            if (bookingStep === 3) return !selectedShow;
            if (bookingStep === 4) return selectedSeats.size !== numberOfTickets;
            if (bookingStep === 5) return !contactEmail || !contactPhone;
        }
        return false;
    };

    const getButtonText = () => {
        const stepMapping = hasLanguageStep ? { 1: 'Select Date', 2: 'Select Tickets', 3: 'Select Showtime', 4: 'Select Seats', 5: 'Update Details', 6: 'Confirm Booking' } : 
                                              { 1: 'Select Tickets', 2: 'Select Showtime', 3: 'Select Seats', 4: 'Update Details', 5: 'Confirm Booking' };
        return isFetchingShowtimes ? "Loading Showtimes..." : stepMapping[bookingStep] || 'Next';
    };

    const handleNext = () => {
        const isLastStep = (hasLanguageStep && bookingStep === 6) || (!hasLanguageStep && bookingStep === 5);
        if (isLastStep) {
            handleConfirmBooking();
        } else {
            setBookingStep(bookingStep + 1);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] overflow-y-auto shadow-2xl animate-slideInUp flex flex-col">
                <div className="relative h-60 overflow-hidden rounded-t-3xl">
                    <img src={movie.backdrop || movie.image} alt={movie.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
                    <button onClick={onClose} className="absolute top-6 right-6 text-white hover:text-gray-300 bg-black/50 backdrop-blur-sm rounded-2xl p-3 hover:bg-black/70 transition-all duration-300 hover:scale-110">
                        <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-8 left-8 text-white max-w-2xl">
                        <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                        {selectedShow && <p className="font-semibold">{selectedShow.theater_id.name} - {selectedShow.show_time}</p>}
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {renderStepContent()}
                </div>
                {bookingStep < maxSteps && (
                    <div className="flex gap-4 p-8 pt-4 border-t border-gray-200 mt-auto">
                        <button onClick={bookingStep === 1 ? onClose : () => setBookingStep(bookingStep - 1)} className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-2xl font-bold hover:bg-gray-300 transition-all duration-300">
                            {bookingStep === 1 ? 'Cancel' : 'Back'}
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={isNextDisabled()}
                            className={`flex-1 py-4 px-8 rounded-2xl font-bold transition-all duration-300 shadow-xl relative overflow-hidden group shimmer-button ${!isNextDisabled()
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
                    <div className="p-8 pt-4 text-center mt-auto">
                        <button onClick={onClose} className="w-full bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-600 text-white py-4 px-8 rounded-2xl font-bold hover:from-fuchsia-700 hover:to-rose-700 transform hover:scale-105 transition-all duration-300 shadow-xl">
                            Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
};

const MobileMenu = ({ showMobileMenu, setShowMobileMenu, activeTab, setActiveTab }) => (
    <div className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${showMobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`fixed top-0 left-0 w-64 h-full bg-white/95 backdrop-blur-xl shadow-2xl p-6 transform transition-transform duration-500 ease-in-out ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center border-b pb-4 mb-6">
                <div className="font-bold text-xl text-gray-900">MOVIKO</div>
                <button onClick={() => setShowMobileMenu(false)} className="p-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <nav className="space-y-2 mb-6">
                {[{ key: 'movies', label: 'Movies', icon: Play }, { key: 'theaters', label: 'Theaters', icon: MapPin }, { key: 'offers', label: 'Offers', icon: Gift }, { key: 'myBookings', label: 'My Bookings', icon: Ticket }].map(({ key, label, icon: Icon }) => (
                    <button key={key} onClick={() => { setActiveTab(key); setShowMobileMenu(false); }} className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-colors duration-300 flex items-center gap-4 ${activeTab === key ? 'bg-gradient-to-r from-fuchsia-100 to-rose-100 text-fuchsia-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                        <Icon className="w-5 h-5" />{label}
                    </button>
                ))}
            </nav>
        </div>
    </div>
);

const App = () => {
    const [activeTab, setActiveTab] = useState('movies');
    const [selectedCity, setSelectedCity] = useState('Hubballi');
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [selectedShow, setSelectedShow] = useState(null);
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [watchingTrailer, setWatchingTrailer] = useState(null);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [bookingEmail, setBookingEmail] = useState('');
    const [userBookings, setUserBookings] = useState([]);
    const [isBookingLoading, setIsBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${API_URL}/movies`);
                
                const formattedMovies = response.data.map(movie => ({
                    id: movie._id,
                    title: movie.title,
                    genre: movie.genres ? movie.genres[0] : 'General',
                    rating: movie.rating || 7.0,
                    duration: movie.duration_minutes ? `${Math.floor(movie.duration_minutes / 60)}h ${movie.duration_minutes % 60}m` : '2h 0m',
                    language: movie.language || 'Multi-Language',
                    image: movie.poster_url,
                    backdrop: movie.backdrop_url || movie.poster_url,
                    description: movie.description,
                    price: 150, 
                    cast: movie.cast,
                    director: movie.director,
                    trailer: movie.trailer_url,
                    trending: Math.random() > 0.5,
                    newRelease: new Date(movie.release_date) > new Date(new Date().setMonth(new Date().getMonth() - 2)),
                    awards: 0,
                    // We will now fetch real showtimes, so this can be empty
                    showtimesByTheater: []
                }));

                const comingSoonData = [
                    {
                        id: 'coming-soon-1',
                        title: 'Sundari 2025',
                        genre: 'Sci-Fi',
                        rating: 0,
                        duration: 'N/A',
                        language: 'Kannada',
                        image: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
                        backdrop: 'https://image.tmdb.org/t/p/original/5wCKd423kEMw2d2IAl2c2225p5A.jpg',
                        description: 'A futuristic tale of love and technology in the heart of Karnataka. Can humanity and AI coexist?',
                        price: 0,
                        cast: ['Radhika Kumaraswamy', 'Sreeleela'],
                        director: 'Visionary Director',
                        trailer: '',
                        status: 'coming-soon',
                        releaseDate: 'October 10, 2025',
                        showtimesByTheater: []
                    },
                    {
                        id: 'coming-soon-2',
                        title: 'Thama 2025',
                        genre: 'Thriller',
                        rating: 0,
                        duration: 'N/A',
                        language: 'Tamil',
                        image: 'https://image.tmdb.org/t/p/w500/yF1eOkaYvwiORauRCPWznV9xVvi.jpg',
                        backdrop: 'https://image.tmdb.org/t/p/original/628Dep6wEtYdeVFAc4iW2rqk26M.jpg',
                        description: 'A gripping thriller that will keep you on the edge of your seat. A detective races against time to solve a mystery.',
                        price: 0,
                        cast: ['Vijay Sethupathi', 'Trisha'],
                        director: 'Masterful Filmmaker',
                        trailer: '',
                        status: 'coming-soon',
                        releaseDate: 'December 5, 2025',
                        showtimesByTheater: []
                    }
                ];

                setMovies([...formattedMovies, ...comingSoonData]);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch movies from backend:", err);
                setError("Could not load movies. Please make sure the backend server is running.");
                setMovies([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        if (movies.length > 2) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % 3);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [movies]);

    useEffect(() => {
        if (selectedMovie) {
            setBookingStep(1);
            setSelectedShow(null);
            setSelectedSeats(new Set());
            setNumberOfTickets(0);
            setSelectedLanguage(null);
            setSelectedDate(new Date());
            setContactEmail('');
            setContactPhone('');
        }
    }, [selectedMovie]);

    const heroSlides = useMemo(() => {
        if (movies.length < 3) return [];
        const moviesWithPrice = movies.filter(m => typeof m.price === 'number' && m.price > 0);
        if (moviesWithPrice.length < 3) return [];
        const sortedMovies = [...moviesWithPrice].sort((a, b) => b.rating - a.rating);
        return [
            { movie: sortedMovies[0], title: "Experience Cinema Like Never Before", subtitle: "Book premium seats with just a few taps" },
            { movie: sortedMovies[1], title: "Your Ultimate Movie Destination", subtitle: "Discover blockbusters and hidden gems" },
            { movie: sortedMovies[2], title: "Premium Comfort, Unbeatable Prices", subtitle: `Starting from just ₹${Math.min(...moviesWithPrice.map(m => m.price)) || 150} per ticket` }
        ];
    }, [movies]);

    const cities = ['Hubballi', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
    const genres = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance'];

    const filteredMovies = useMemo(() => movies.filter(movie => {
        if (movie.status === 'coming-soon') return false;

        const searchLower = searchQuery.toLowerCase();
        const titleMatch = (movie.title || '').toLowerCase().includes(searchLower);
        const genreMatch = (movie.genre || '').toLowerCase().includes(searchLower);
        const castMatch = movie.cast && movie.cast.some(actor => (actor || '').toLowerCase().includes(searchLower));
        
        const matchesSearch = titleMatch || genreMatch || castMatch;
        const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;
        
        return matchesSearch && matchesGenre;
    }), [movies, searchQuery, selectedGenre]);

    const toggleSeat = (seatId) => {
        const newSelectedSeats = new Set(selectedSeats);
        if (newSelectedSeats.has(seatId)) {
            newSelectedSeats.delete(seatId);
        } else {
            if (newSelectedSeats.size < numberOfTickets) {
                newSelectedSeats.add(seatId);
            } else {
                console.log(`You can only select ${numberOfTickets} tickets.`);
            }
        }
        setSelectedSeats(newSelectedSeats);
    };

    const handleFetchBookings = async () => {
        if (!bookingEmail) {
            setBookingError("Please enter an email address.");
            return;
        }

        const normalizedEmail = bookingEmail.trim().toLowerCase();

        setIsBookingLoading(true);
        setBookingError(null);
        setUserBookings([]);
        try {
            const response = await axios.get(`${API_URL}/bookings/user/${normalizedEmail}`);
            if (response.data && response.data.length > 0) {
                setUserBookings(response.data);
            } else {
                setBookingError("No bookings found for this email address.");
            }
        } catch (err) {
            console.error("Failed to fetch bookings:", err);
            setBookingError("Could not retrieve bookings. Please try again later.");
        } finally {
            setIsBookingLoading(false);
        }
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
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
            pointer-events: none;
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
        .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: #a78bfa;
        }
      `}</style>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-rose-50 to-fuchsia-50 text-gray-800">
                <header className="bg-white/80 backdrop-blur-xl shadow-lg sticky top-0 z-40 border-b border-white/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-3 animate-slideInLeft">
                                <div className="relative">
                                    <svg width="40" height="40" viewBox="0 0 100 100" className="transform hover:scale-110 transition-all duration-300 drop-shadow-2xl">
                                        <path d="M15 20 C15 15, 20 10, 25 10 L75 10 C80 10, 85 15, 85 20 L85 35 C82 35, 80 37, 80 40 C80 43, 82 45, 85 45 L85 80 C85 85, 80 90, 75 90 L25 90 C20 90, 15 85, 15 80 L15 45 C18 45, 20 43, 20 40 C20 37, 18 35, 15 35 Z" fill="#EF4444" className="drop-shadow-lg" />
                                        <polygon points="35,30 35,50 50,40" fill="white" className="drop-shadow-sm" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-gray-900 tracking-wide">MOVIKO</span>
                                    <div className="text-xs text-gray-500 font-medium -mt-1">Cinema & Chill</div>
                                </div>
                            </div>
                            <nav className="hidden md:flex space-x-1 animate-slideInUp bg-gray-100/50 backdrop-blur-sm rounded-2xl p-1" style={{ animationDelay: '0.2s' }}>
                                {[{ key: 'movies', label: 'Movies', icon: Play }, { key: 'theaters', label: 'Theaters', icon: MapPin }, { key: 'offers', label: 'Offers', icon: Gift }, { key: 'comingSoon', label: 'Coming Soon', icon: Zap }, { key: 'myBookings', label: 'My Bookings', icon: Ticket }].map(({ key, label, icon: Icon }) => (
                                    <button key={key} onClick={() => setActiveTab(key)} className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-sm ${activeTab === key ? 'bg-gradient-to-r from-fuchsia-600 to-rose-600 text-white shadow-lg shadow-fuchsia-500/30' : 'text-gray-600 hover:text-gray-800 hover:bg-white/70'}`}>
                                        <Icon className="w-4 h-4" />{label}
                                    </button>
                                ))}
                            </nav>
                            <div className="flex items-center space-x-2 animate-slideInRight">
                                <div className="relative hidden sm:block">
                                    <button onClick={() => setShowCityDropdown(!showCityDropdown)} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-fuchsia-500 focus:bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                                        <MapPin className="w-4 h-4 text-fuchsia-500" />
                                        <span>{selectedCity}</span>
                                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showCityDropdown ? 'rotate-90' : ''}`} />
                                    </button>
                                    {showCityDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 animate-slideDown z-50">
                                            {cities.map(city => (
                                                <a href="#" key={city} onClick={(e) => { e.preventDefault(); setSelectedCity(city); setShowCityDropdown(false); }} className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors ${selectedCity === city ? 'font-bold text-fuchsia-600' : ''}`}>{city}</a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button className="p-2 text-gray-600 hover:text-gray-800 rounded-2xl hover:bg-white/70 transition-all duration-300 transform hover:scale-110 relative">
                                    <Bell className="w-5 h-5" />
                                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white/80"></div>
                                </button>
                                <button onClick={() => setShowMobileMenu(true)} className="p-3 md:hidden text-gray-600 hover:text-gray-800 rounded-2xl hover:bg-white/70 transition-all duration-300">
                                    <Menu className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {error && <div className="col-span-full text-center py-20 text-red-500 bg-red-100 rounded-2xl text-lg">{error}</div>}
                    
                    {!error && activeTab === 'movies' && (
                        <>
                            <HeroSection 
                                heroSlides={heroSlides} 
                                currentSlide={currentSlide} 
                                setCurrentSlide={setCurrentSlide}
                                setSelectedMovie={setSelectedMovie}
                                setWatchingTrailer={setWatchingTrailer}
                            />
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
                                        filteredMovies.map((movie, index) => (
                                            <MovieCard 
                                                key={movie.id} 
                                                movie={movie} 
                                                index={index} 
                                                setSelectedMovie={setSelectedMovie}
                                                setWatchingTrailer={setWatchingTrailer}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-20 text-gray-500 text-lg">No movies found for your search.</div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab === 'theaters' && <TheatersView />}
                    {activeTab === 'offers' && <OffersView />}
                    {activeTab === 'comingSoon' && <ComingSoonView movies={movies} />}
                    {activeTab === 'myBookings' && (
                        <MyBookingsView 
                            bookingEmail={bookingEmail}
                            setBookingEmail={setBookingEmail}
                            handleFetchBookings={handleFetchBookings}
                            userBookings={userBookings}
                            isBookingLoading={isBookingLoading}
                            bookingError={bookingError}
                        />
                    )}
                </main>

                {selectedMovie && (
                    <BookingModal 
                        movie={selectedMovie} 
                        onClose={() => setSelectedMovie(null)}
                        bookingStep={bookingStep}
                        setBookingStep={setBookingStep}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        numberOfTickets={numberOfTickets}
                        setNumberOfTickets={setNumberOfTickets}
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        selectedShow={selectedShow}
                        setSelectedShow={setSelectedShow}
                        selectedSeats={selectedSeats}
                        setSelectedSeats={setSelectedSeats}
                        contactEmail={contactEmail}
                        setContactEmail={setContactEmail}
                        contactPhone={contactPhone}
                        setContactPhone={setContactPhone}
                        toggleSeat={toggleSeat}
                    />
                )}
                {watchingTrailer && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn" onClick={() => setWatchingTrailer(null)}>
                        <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
                            <button onClick={() => setWatchingTrailer(null)} className="absolute -top-12 right-0 text-white p-2 hover:opacity-80 transition-opacity">
                                <X size={32} />
                            </button>
                            <iframe
                                className="w-full h-full rounded-2xl"
                                src={`${watchingTrailer}?autoplay=1`}
                                title="Movie Trailer"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
                <MobileMenu 
                    showMobileMenu={showMobileMenu}
                    setShowMobileMenu={setShowMobileMenu}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>
        </>
    );
};

export default App;