import Header from "./Header";
import { useNowPlayingMovies } from "../customHooks/useNowPlayingMovies";
import BrowseMainContainer from "./BrowseMainContainer";
import BrowseSecondaryContainer from "./BrowseSecondaryContainer";
import { usePopularMovies } from "../customHooks/usePopulerMovies";
import { useTopRatedMovies } from "../customHooks/useTopRatedMovies";
import { useUpcomingMovies } from "../customHooks/useUpcomingMovies";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { SearchContainer } from "./search/SearchContainer";

const Browse = () => {
  const mainContainer = useRef(null);
  const [scrolledHalf, setScrolledHalf] = useState(false);
  const tmdbSearchMovies = useSelector(
    (store) => store.movies.searchedTmdbMovies
  );
  // const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  useEffect(() => {
    const handleScroll = () => {
      const container = mainContainer?.current;

      if (!container) return;

      const rec = container.getBoundingClientRect();
      if (rec.top < -15) setScrolledHalf(true);
      else setScrolledHalf(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  

  return (
    <div className="">
      <div className="relavite">
        <div
          className={` px-11 fixed flex top-0 left-0 right-0 bottom-0 transition-all duration-500 justify-center z-15 ${
            scrolledHalf
              ? "bg-black/90 h-20"
              : " h-20 bg-gradient-to-b from-black to-transparent to-[95%]"
          }`}
        >
          <Header loggedIn={true} />
        </div>

        {tmdbSearchMovies?.length ? (
          <SearchContainer moviesData={tmdbSearchMovies} />
        ) : (
          <div>
            <div id="homeDisplay" ref={mainContainer}>
              <BrowseMainContainer />
            </div>
            <section id="movies">
            <BrowseSecondaryContainer />
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
