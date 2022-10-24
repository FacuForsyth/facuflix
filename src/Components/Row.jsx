import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Row = ({ title, fetchURL, rowID }) => {

  const [movies, setMovies] = useState([]);
 
  useEffect(()=> {   
    axios.get(fetchURL).then((resp) => {
      setMovies(resp.data.results)
    })
  }, [fetchURL]);
  //console.log(movies)
  const slideLeft = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider' + rowID);
    slider.scrollLeft = slider.scrollLeft + 500;
  };


  const renderMovies = () => (
    movies.map((item, id) => {
      return (
        <Movie key={id} item={item}/>
      )
    })
  );

  return (
    <>
      <h2 className="font-bold text-white md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft 
          onClick={slideLeft}
          className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
          size={40} 
        />
        <div id={'slider' + rowID} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative">
          {renderMovies()}
        </div>
        <MdChevronRight
          onClick={slideRight} 
          className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' 
          size={40} 
        />
      </div>
    </>
  )
};

export default Row;