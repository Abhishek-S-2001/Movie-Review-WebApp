import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './HomePage.css';
import AddMovie from '../AddMovie/AddMovie';
import AddReview from '../AddReview/AddReview';


interface Movie {
    _id: string;
    mname: string;
    release: string;
    mrating: number;
  }

const HomePage: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    
    const [movies, setMovies] =  useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await axios.get('https://movie-review-web-app-woad.vercel.app/movies/all');
            console.log(response)
            setMovies(response.data.movies);
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
    
        fetchMovies();
    }, []);


    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenReviewModal = () => {
        setIsReviewModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsReviewModalOpen(false);
    };

    const handleAddMovie = (movieName: String, releaseDate: String) => {
    };

    const handleAddReview =(movie: string, reviewName: string, rating: number, content: string) => {
    };

  return (
    <div>
    <div className='container'>
        <div className='container__topbar'>
            <text className='header'>MOVIECRITIC</text>
            <button className='btn_add__movie' onClick={handleOpenModal}>Add New Movie</button>
            <button className='btn_add__review' onClick={handleOpenReviewModal}>Add New Review</button>
        </div>

        <div className='container__mainscreen'>
            <text className='mainscreen__header'>The best movie review sites!</text>
            {/* Search Box
            <div className="search-box">
                <input type="text" placeholder="Search for your favourite Movie" className="search-input" />
                <button className="search-btn">Search</button>
            </div> */}

            <div className='movie__container'>
                <div className="cardContainer">
                {movies.map((movie, index) => (
                    <div className="card" key={index}>
                        <Link to={`/movie/${movie._id}`} className='movie__link'>
                        <div className='content__container'>
                            <text className='movie__name'>{movie.mname}</text>
                            <text className='movie__release'>Released: {movie.release}</text>
                            <text className='movie__rating'>Rating: {movie.mrating}/10</text>
                        </div>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>

        <div className='container__bottombar'>
        <text className='footer__copyright'>Copyright 2021</text>
        <text className='footer__instagram'>Follow us on Instagram</text>
        </div>
    </div>
        {isModalOpen && (
            <AddMovie onClose={handleCloseModal} onAddMovie={handleAddMovie} />
        )}
        {isReviewModalOpen && (
           <AddReview
           movies={movies.map(movie => ({ name: movie.mname, release: movie.release, rating: movie.mrating.toString() }))}
           onClose={handleCloseReviewModal}
           onAddReview={handleAddReview}
            />
        )}
    </div>
    );
};

export default HomePage;