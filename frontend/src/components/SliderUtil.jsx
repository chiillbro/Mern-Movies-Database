import Slider from "react-slick";

// import "slick-carousel/slick/slick.css";

// import "slick-carousel/slick/slick-theme.css";
import MovieCard from "../pages/Movies/MovieCard";

const SliderUtil = ({ data, settings }) => {
  return (
    <div className="w-[75vw] ">
      <Slider {...settings}>
        {data?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
};

export default SliderUtil;
