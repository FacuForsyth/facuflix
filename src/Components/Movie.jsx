import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
 
const Movie = ({ item }) => {

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        saveShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert('Please log in to save a movie');
    }
  }

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] mr-2 inline-block cursor-pointer relative p-2">
      <img 
        className="w-full h-auto block" 
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} 
        alt={item?.title} 
      />         
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <div className="text-xs md:text-sm flex justify-center items-center white-space-normal h-full " >
        {/* white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full  */}
        {item.title ? (
          <Link className='cursor-pointer' to={`/movie/${item.id}`}>{item.title}</Link>
          ) : (
          <h3>'No movie'</h3>
          )}
        </div>
        <p onClick={saveShow}>
          {like ? 
            <FaHeart className="absolute top-4 left-4 text-gray-300" /> 
          : 
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" /> 
          }
        </p>
      </div>
    </div>
    
  )
};

export default Movie;