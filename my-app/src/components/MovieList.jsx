import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard"
import { OPTIONSOBJ } from "../utils/constants";
import { useDispatch } from "react-redux";
import { MovieApiList } from "../utils/helperFunctions/movieApiActionList";

const MovieList = ({name,title, movies}) => {
    const scrollableList = useRef(null);
    const [loading,setLoading] = useState(false);
    const [hasMorePage,setHasMorePage] = useState(true);
    const [page,setPage] = useState(1);
    let oneTimePause = useRef(true);
    const dispatch = useDispatch();

    useEffect(()=>{
      let el = scrollableList.current;
      if(!el) return;

      const handleScroll = ()=>{
        if(el.scrollLeft + el.clientWidth > el.scrollWidth - 100 && !loading && hasMorePage){
          setPage(prev => prev+1);
        }
      }  

      el.addEventListener("scroll",handleScroll);

      return ()=>el.removeEventListener("scroll",handleScroll);
    },[loading,hasMorePage])

    useEffect(()=>{
      const fetchMore = async ()=>{
        setLoading(true); 
        const response = await fetch(`${MovieApiList[name].link}?language=en-US&page=${page}`, OPTIONSOBJ);
        const moreData = await response.json();
        setHasMorePage(page < Math.floor(moreData.total_pages/20));
        dispatch(MovieApiList[name].action(moreData));
        setLoading(false);
      }

     !oneTimePause.current && fetchMore();
     oneTimePause.current = false;

    },[page]);
    return (
      <div  className="ml-12 cursor-pointer">
        <h1 className=" text-[17px] border-l-3 pl-2 font-semibold mb-2 text-amber-50 ">{title}</h1>
        <div ref={scrollableList} className="flex overflow-y-hidden no-scrollbar mb-9">
          <div  className="flex">
            {movies.map((movie,index) => (
              <MovieCard key={`${movie.id}-${index}`} title={movie.title} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    );
}

export default MovieList