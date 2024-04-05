import { useState } from "react";

import {
  useGetAllMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useGetGenresQuery } from "../../redux/api/genre";

import SliderUtil from "../../components/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetAllMoviesQuery();

  const { data: topMovies } = useGetTopMoviesQuery();

  const { data: genres } = useGetGenresQuery();

  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  // console.log(genres);

  const filteredMovies = data?.filter(
    (movie) =>
      selectedGenre === null ||
      (movie.genre && movie.genre.includes(selectedGenre))
  );
  // console.log(filteredMovies);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="w-full flex flex-col lg:flex-row lg:justify-between items-start -mt-[5rem]">
      <nav className="m-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-xl ${
              selectedGenre === genre._id ? "bg-gray-200" : ""
            } `}
            onClick={() => handleGenreClick(genre._id)}
          >
            {genre.name}
          </button>
        ))}
      </nav>

      <section className=" flex flex-col justify-center items-center lg:w-auto">
        <div className=" lg:w-[100rem] mb-8">
          <h1 className="mb-5">Chosen For You</h1>
          <SliderUtil settings={settings} data={randomMovies} />
        </div>

        <div className=" lg:w-[100rem] mb-8 ">
          <h1 className="mb-5">Top Movies</h1>
          <SliderUtil settings={settings} data={topMovies} />
        </div>
        <div className=" lg:w-[100rem] mb-8 ">
          <h1 className="mb-5">Choose based on your favorite genre</h1>
          <SliderUtil settings={settings} data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
