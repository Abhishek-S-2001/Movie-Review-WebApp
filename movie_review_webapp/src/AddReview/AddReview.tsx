import React, { useState, useEffect } from 'react';
import './AddReview.css'
import axios from 'axios';
import { arrayBuffer } from 'stream/consumers';

interface Movie{
    _id: string;
    mname: string;
}

interface AddReviewProps {
    movies: { name: string; release: string; rating: string }[];
    onClose: () => void;
    onAddReview: (movieName: string, reviewName: string, rating: number, reviewText: string) => void;
}

const AddReview: React.FC<AddReviewProps> = ({ onClose, onAddReview }) => {
    const [selectedMovie, setSelectedMovie] = useState('');
    const [reviewName, setReviewName] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

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


    const handleMovieChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMovie(e.target.value);
    };

    const handleReviewNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReviewName(e.target.value);
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRating(parseInt(e.target.value));
    };

    const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(e.target.value);
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://movie-review-web-app-woad.vercel.app/reviews/${selectedMovie}/reviews/add`, {
                rname: reviewName,
                rrating: rating,
                review: reviewText
            });
            console.log('Review added successfully:', response.data.message);
        } catch (error) {
            console.error('Error adding review:', error);
        }
        onAddReview(selectedMovie, reviewName, rating, reviewText);
        onClose();
    };

    return (
        <div className="review__modal">
            <div className="review__modal-content">
                <button className="close" onClick={onClose}>&times;</button>
                <text className='addreview'>Add New Review</text>
                <form onSubmit={handleSubmit}>
                    <select className='select__movie' value={selectedMovie} onChange={handleMovieChange} required>
                        <option >Select a movie</option>
                        {movies.map((movie, index) => (
                            <option className='options' key={index} value={movie._id} aria-placeholder={movie.mname}>{movie.mname}</option>
                        ))}
                    </select>
                    <input className='input' type="text" value={reviewName} onChange={handleReviewNameChange} placeholder="Your Name" required />
                    <input className='input' type="number" value={rating} onChange={handleRatingChange} min={1} max={10} placeholder="Rating out of 10" required />
                    <textarea className='input__area' value={reviewText} onChange={handleReviewTextChange} placeholder=" Add Comments" required />
                    <button className='btn__submit' type="submit">Add Review</button>
                </form>
            </div>
        </div>
    );
};

export default AddReview;
