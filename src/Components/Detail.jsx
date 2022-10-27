import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import Row from "./Row";

const Detail = () => {
  const params = useParams();
  //console.log(params.id) //accedo al ID
  const [movie, setMovie] = useState();
  const [trailer, setTrailer] = useState();
  const [playing, setPlaying] = useState(false)
  //console.log(params)

  const movieTrailer = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${params?.id}?api_key=6a15f1713eef1506eefc351985fa5d79&append_to_response=videos`);
    setMovie(data);

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
      setTrailer(trailer ? trailer : data.videos.results[0])
    };
  };

  useEffect(()=> {
    movieTrailer();
  }, [params]);

  const handlerClick = () => {
    user?.email ? setPlaying(true) : alert('Please log in to play trailer');  
  };

  //BUTTON FAV
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
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert('Please log in to save a movie');
    }
  };

  return (
    <div>
      {playing?
        <>
          <button 
            className="absolute z-100 pl-[95%] pt-[10%]"
            type="button"
            onClick={() => setPlaying(false)}
          >
            <AiOutlineCloseCircle color="white" size={25}/>
          </button>
        <div className="pt-14">
          <YouTube
            videoId={trailer.key}
            className={"youtube amru"}
            containerClassName={"youtube-container amru"}
            opts={
                {
                    width: '100%',
                    height: '500px',
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                    },
                }
            }
          />
        </div>
        </>
        :
        <>
        <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
          <img className='w-full h-[550px] object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
          
          <div className='absolute w-full top-[20%] p-4 md:p-8'>
            <h1 className='text-3xl md:text-5xl font-bold text-white'>{movie?.title}</h1>  
            
            <div className='my-4'>
              <button 
                onClick={handlerClick} 
                type="button" 
                className="border bg-gray-300 text-black border-gray-300 py-2 px-5"
              >
                Play Trailer
              </button>
              <button 
                onClick={saveShow}
                type="button" 
                className="border text-white border-gray-300 py-3 px-5 ml-4"
              >
              {like ? 
                <FaHeart className="text-gray-300" /> 
                : 
                <FaRegHeart className="text-gray-300" /> 
              }
              </button>
            </div>
          
            <p className="text-sm text-gray-400">Released: {movie?.release_date}</p>
            <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">{movie?.overview}</p>
        </div>
        </>
      }
      <Row rowID="5" title='Similar' fetchURL={`https://api.themoviedb.org/3/movie/${movie?.id}/similar?api_key=6a15f1713eef1506eefc351985fa5d79&language=en-US&page=1`} />  
    </div>
  )
};

export default Detail;