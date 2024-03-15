import React, {useState} from 'react';
import './AddMovie.css';
import axios from 'axios';

interface AddMovieProps {
    onClose: () => void;
    onAddMovie: (movieName: String, releaseDate: String) => void;
  }

const AddMovie: React.FC<AddMovieProps> = ({ onClose, onAddMovie }) => {
    const [movieName, setMovieName] = useState('');
    const [releaseDate, setReleaseDate] = useState('');

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovieName(e.target.value);
    };

    const handleChangeReleaseDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReleaseDate(e.target.value);
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/movies/add', {
                mname: movieName,
                release: releaseDate,
                mrating: 9
            });
            console.log('Movie added successfully:', response.data.message);
        } catch (error) {
            console.error('Error adding movie:', error);
        }
        onAddMovie(movieName, releaseDate);
        onClose();
    };  

    return(
        <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <text className='addmovie'>Add New Movie</text>
          <form onSubmit={handleSubmit}>
            <input type="text" className='input' value={movieName} onChange={handleChangeName} placeholder="Name" required />
            <input type='text' className='input' value={releaseDate} onChange={handleChangeReleaseDate} placeholder='Release Date' required />
            <button type="submit" className='btn__submit'>Add Movie</button>
          </form>
        </div>
      </div>
    );
  };
export default AddMovie;