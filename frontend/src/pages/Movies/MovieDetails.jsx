import { useState } from "react";

import { useParams, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";

import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";

const MovieDetails = () => {
  const { id: movieId } = useParams();

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({ id: movieId, rating, comment }).unwrap();

      refetch();
      toast.success("Review posted successfully");
    } catch (error) {
      //   console.log(error);
      toast.error("Movie already reviewed");
    }
  };
  return (
    <div className="h-[70rem] overflow-hidden">
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[20rem]"
        >
          Go Back
        </Link>
      </div>

      <div className="mt-[2rem]">
        <div className="flex justify-center items-center">
          <img
            src={movie?.image}
            alt={movie?.name}
            className="w-[60%] h-[30rem] rounded object-contain"
          />
        </div>

        {/* Container One */}

        <div className="container flex jb ml-[20rem] mt-[3rem]">
          <section>
            <h2 className="text-5xl my-4 font-extrabold">{movie?.name}</h2>
            <p className="my-4 xl:w-[35rem] lg:w-[30rem] text-[#B0B0B0]">
              {movie?.detail}
            </p>
          </section>

          <div className="ml-[5rem] ">
            <p className="text-2xl font-semibold ">
              Releasing Date : {movie?.year}
            </p>

            <div>
              {movie?.cast.map((c, index) => (
                <ul key={index}>
                  <li className="mt-[1rem]">{c}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>

        <div className="container ml-[20rem]">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
