import axios from 'axios';
import React, { useEffect, useState } from 'react';
import requests from '../Requests';
import '../Styles/main.css'
import MovieMain from './MovieMain';

const Main = () => {

  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];

  const fetchMovies = async () => {
    await axios.get(requests.requestPopular).then((resp)=>{
      setMovies(resp.data.results)
    })
  }

  useEffect(()=> {
    //axios.get(requests.requestPopular).then((resp)=>{
    //  setMovies(resp.data.results)
    //})
    fetchMovies();
  }, [])
  //console.log(movie)
  

  return (
    <div className='w-full h-[550px] text-white'>
      <div className='w-full h-full'>
        <MovieMain movie={movie} />
        
      </div>
    </div>
  )
};

export default Main;