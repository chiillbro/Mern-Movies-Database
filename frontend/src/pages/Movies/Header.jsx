import SliderUtil from "../../components/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";

import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <div className="w-[100vw]flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
      <nav className=" md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0">
        <Link
          to="/"
          className="transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg"
        >
          Browse Movies
        </Link>
      </nav>

      <div className=" md:w-[80%] md:ml-[5rem] lg:ml-[14rem] md:mr-2">
        <SliderUtil settings={settings} data={data} />
      </div>
    </div>
  );
};

export default Header;
