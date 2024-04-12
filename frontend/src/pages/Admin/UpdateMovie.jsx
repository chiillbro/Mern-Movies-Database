// import { useEffect, useState } from "react";

// import { useParams, useNavigate } from "react-router-dom";

// import {
//   useGetSpecificMovieQuery,
//   useUpdateMovieMutation,
//   useUploadImageMutation,
//   useDeleteMovieMutation,
// } from "../../redux/api/movies";
// import { useGetGenresQuery } from "../../redux/api/genre";

// import { toast } from "react-toastify";

// const UpdateMovie = () => {
//   const { id } = useParams();

//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: 0,
//     detail: "",
//     cast: [],
//     genre: "",

//     image: null,
//   });

//   const [selectedImage, setSelectedImage] = useState(null);

//   const { data: initialMovieData } = useGetSpecificMovieQuery(id);
//   const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();

//   useEffect(() => {
//     if (initialMovieData) {
//       setMovieData(initialMovieData);
//     }
//     // console.log(movieData);
//   }, [initialMovieData]);

//   const [updateMovie, { isLoading: isUpdatingMovie }] =
//     useUpdateMovieMutation();

//   const [
//     uploadImage,
//     { isLoading: isUploadingImage, error: uploadImageErrorDetails },
//   ] = useUploadImageMutation();

//   const [deleteMovie] = useDeleteMovieMutation();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setMovieData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleGenreChange = (e) => {
//     const { value } = e.target;

//     setMovieData((prevData) => ({
//       ...prevData,
//       genre: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleUpdateMovie = async () => {
//     try {
//       if (
//         !movieData.name ||
//         !movieData.year ||
//         !movieData.detail ||
//         !movieData.cast
//       ) {
//         toast.error("Please fill all the fields");
//         return;
//       }
//       let upLoadedImagePath = movieData.image;

//       if (selectedImage) {
//         const formData = new FormData();
//         formData.append("image", selectedImage);
//         const uploadImageResponse = await uploadImage(formData);

//         if (uploadImageResponse.data) {
//           upLoadedImagePath = uploadImageResponse.data.Image;
//         } else {
//           console.error("Failed to upload image: ", uploadImageErrorDetails);

//           toast.error("Failed to upload image");
//           return;
//         }
//       }

//       await updateMovie({
//         id: id,
//         updatedMovie: {
//           ...movieData,
//           image: upLoadedImagePath,
//         },
//       });

//       navigate("/movies");
//       window.location.reload();
//     } catch (error) {
//       console.error("Failed to update movie", error);
//     }
//   };

//   const handleDeleteMovie = async () => {
//     try {
//       toast.success("Movie deleted successfully");
//       await deleteMovie(id);
//       navigate("/movies");
//     } catch (error) {
//       console.error("Failed to delete movie", error);
//       toast.error(`Failed to delete movie: ${error?.message}`);
//     }
//   };

//   return (
//     <div className="container flex justify-center items-center mt-4">
//       <form>
//         <p className="text-green-200 w-[50rem] text-2xl mb-4">Update movie</p>

//         <div className="mb-4">
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={movieData.name}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full "
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Year:
//             <input
//               type="number"
//               name="year"
//               value={movieData.year}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full "
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Detail:
//             <textarea
//               name="detail"
//               value={movieData.detail}
//               className="border px-2 py-1 w-full"
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Cast (comma-separated):
//             <input
//               type="text"
//               name="cast"
//               value={movieData.cast.join(", ")}
//               onChange={(e) =>
//                 setMovieData({ ...movieData, cast: e.target.value.split(", ") })
//               }
//               className="border px-2 py-1 w-full "
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Genre:
//             <select
//               name="genre"
//               value={movieData.genre}
//               onChange={handleGenreChange}
//               className="border px-2 py-1 w-full text-black"
//             >
//               {isLoadingGenres ? (
//                 <option>Loading genres...</option>
//               ) : (
//                 genres.map((genre) => (
//                   <option key={genre._id} value={genre._id}>
//                     {genre.name}
//                   </option>
//                 ))
//               )}
//             </select>
//           </label>
//         </div>
//         <div className="mb-4">
//           <label
//             style={
//               !selectedImage
//                 ? {
//                     border: "1px solid #888",
//                     borderRadius: "5px",
//                     padding: "8px",
//                     cursor: "pointer",
//                   }
//                 : {
//                     border: "0",
//                     borderRadius: "0",
//                     padding: "0",
//                   }
//             }
//           >
//             {!selectedImage && "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{
//                 display: !selectedImage ? "none" : "block",
//               }}
//             />
//           </label>
//         </div>

//         <button
//           type="button"
//           onClick={handleUpdateMovie}
//           className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
//           disabled={isUpdatingMovie || isUploadingImage}
//         >
//           {isUpdatingMovie || isUploadingImage
//             ? "Updating...."
//             : "Update movie"}
//         </button>
//         <button
//           type="button"
//           onClick={handleDeleteMovie}
//           className="bg-red-500 text-white px-4 py-2 rounded ml-2"
//           disabled={isUpdatingMovie || isUploadingImage}
//         >
//           {isUpdatingMovie || isUploadingImage
//             ? "Deleting....."
//             : "Delete Movie"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateMovie;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useUploadImageMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { useGetGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    genre: [],
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

  const { data: initialMovieData } = useGetSpecificMovieQuery(id);
  const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const handleAddGenre = () => {
    if (selectedGenre && !movieData.genre.includes(selectedGenre)) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: [...prevData.genre, selectedGenre],
      }));
    }
    setSelectedGenre("");
  };

  const handleRemoveGenre = (genreId) => {
    setMovieData((prevData) => ({
      ...prevData,
      genre: prevData.genre.filter((id) => id !== genreId),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast.length
      ) {
        toast.error("Please fill all the fields");
        return;
      }

      let upLoadedImagePath = movieData.image;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          upLoadedImagePath = uploadImageResponse.data.Image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: upLoadedImagePath,
        },
      });

      navigate("/movies");
      // window.location.reload();
    } catch (error) {
      console.error("Failed to update movie", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("Movie deleted successfully");
      await deleteMovie(id);
      navigate("/movies");
    } catch (error) {
      console.error("Failed to delete movie", error);
      toast.error(`Failed to delete movie: ${error?.message}`);
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Update movie</p>

        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full "
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border px-2 py-1 w-full "
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              className="border px-2 py-1 w-full"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="border px-2 py-1 w-full "
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={selectedGenre}
              onChange={handleGenreChange}
              className="border px-2 py-1 w-full text-black"
            >
              <option value="">Select Genre</option>
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres &&
                genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
            <button
              type="button"
              onClick={handleAddGenre}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Genre
            </button>
          </label>
          {movieData.genre.length > 0 && genres && (
            <div className="mt-2">
              {movieData.genre.map((genreId) => {
                const genre = genres.find((genre) => genre._id === genreId);
                return (
                  <span
                    key={genreId}
                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    {genre ? genre.name : "Unknown Genre"}
                    <button
                      type="button"
                      onClick={() => handleRemoveGenre(genreId)}
                      className="ml-2"
                    >
                      &#10006;
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                    cursor: "pointer",
                  }
                : { border: "0", borderRadius: "0", padding: "0" }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleUpdateMovie}
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage
            ? "Updating...."
            : "Update movie"}
        </button>
        <button
          type="button"
          onClick={handleDeleteMovie}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          disabled={isUpdatingMovie || isUploadingImage}
        >
          {isUpdatingMovie || isUploadingImage
            ? "Deleting....."
            : "Delete Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
