import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import './MovieDetail.css'

interface Review {
    _id: string;
    rname: string;
    review: string;
    rrating: number;
  }

const MovieDetail: React.FC = () => {
    
    const movieId  = useParams();

    const [moviereviews, setReviews] =  useState<Review[]>([]);
    const [movieName, setMovieName] = useState<string>('');

    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await axios.get(`https://movie-review-web-app-woad.vercel.app/reviews/${movieId.movieId}/reviews`);
            setReviews(response.data.reviews);
            setMovieName(response.data.mname);
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
        };
    
        fetchReviews();
    }, []);

  return (
<div>
    <div className='container'>
        <div className='container__topbar'>
            <text className='header'>MOVIECRITIC</text>
        </div>

        <div className='rcontainer__mainscreen'>  
            <div className= 'rmainscreen__header'>
                <text className='movie__name'> {movieName} </text>
            </div>
            <div className='reviews__container'>
                <div className="rcardContainer">
                {moviereviews.map((review, index) => (
                    <div className="rcard" key={index}>
                        <div className='rcontent__container'>
                            <text className='review__rating'>Rating: {review.rrating}/10</text>
                            <text className='review__review'>{review.review}</text>
                            <text className='review__name'>By {review.rname}</text> 
                        </div>
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
    <Link to="/">Back</Link>
</div>
  );
};

export default MovieDetail;