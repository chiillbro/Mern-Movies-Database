import { Link } from "react-router-dom";

import { useGetAllMoviesQuery } from "../../redux/api/movies";

import { useDispatch, useSelector } from "react-redux";

import {
  setFilteredMovies,
  setMoviesFilter,
} from "../../redux/features/movies/moviesSlice";
import { useEffect } from "react";
import UpdateMovieCard from "./UpdateMovieCard";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();

  const dispatch = useDispatch();

  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(setFilteredMovies(movies || []));
  }, [movies, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));

    const filteredMovies = movies.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    dispatch(setFilteredMovies(filteredMovies));
  };
  return (
    <div className="container ">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-xl font-bold h-12">
            All movies ({movies?.length})
            <input
              type="text"
              className=" text-base w-[30%] h-[2rem] border px-10 outline-none rounded lg:ml-[10rem] md:ml-[5rem] sm:ml-[1rem]"
              placeholder="Search Movie"
              value={moviesFilter.searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <section className=" w-screen flex justify-center items-center flex-wrap">
            {/* {filteredMovies?.map((movie) => ( */}
            <UpdateMovieCard filteredMovies={filteredMovies} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;

// import { Link } from "react-router-dom";
// import { useGetAllMoviesQuery } from "../../redux/api/movies";

// const AdminMoviesList = () => {
//   const { data: movies } = useGetAllMoviesQuery();
//   return (
//     <div className="container mx-9">
//       <div className="flex flex-col md:flex-row">
//         <div className="p-3">
//           <div className="ml-2 text-xl font-bold h-12">
//             All movies ({movies?.length})
//           </div>
//           <div className="flex flex-wrap justify-around items-center p-2">
//             {movies?.map((movie) => (
//               <div key={movie._id} className="block mb-4 overflow-hidden">
//                 <div className="max-w-sm m-2 rounded overflow-hidden shadow-lg">
//                   <img
//                     src={movie.image}
//                     alt={movie.name}
//                     className="w-full h-48 object-cover"
//                   />
//                   <div className="px-6 py-4 border border-gray-400">
//                     <div className="font-bold text-xl mb-2">{movie.name}</div>
//                     <p className="text-gray-700 text-base">{movie.detail}</p>
//                     <div className="mt-2 mb-1">
//                       <Link
//                         to={`/admin/movies/update/${movie._id}`}
//                         className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//                       >
//                         Update Movie
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminMoviesList;
