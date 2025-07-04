import { useDispatch, useSelector } from "react-redux";
import { NOW_PLAYING_MOVIES_API, OPTIONSOBJ } from "../utils/constants";
import { useEffect } from "react";
import { addNowPlayingMovies } from "../utils/store/slice/movieSlice";

export const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getMovies = async function () {
    try {
      const response = await fetch(NOW_PLAYING_MOVIES_API+"?language=en-US&page=1", OPTIONSOBJ);
      const data = await response.json();
      dispatch(addNowPlayingMovies(data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    !nowPlayingMovies?.length && getMovies();
  }, []);
};
