// import { useState, useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// import {
//   useCreateMovieMutation,
//   useUploadImageMutation,
// } from "../../redux/api/movies";

// import { useGetGenresQuery } from "../../redux/api/genre";

// import { toast } from "react-toastify";

// const CreateMovie = () => {
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: 0,
//     detail: "",
//     cast: [],

//     image: null,
//     genre: "",
//   });

//   const [selectedImage, setSelectedImage] = useState(null);

//   const [
//     createMovie,
//     { isLoading: isCreatingMovie, error: createMovieErrorDetail },
//   ] = useCreateMovieMutation();

//   const [
//     uploadImage,
//     { isLoading: isUploadingImage, error: uploadImageErrorDetails },
//   ] = useUploadImageMutation();

//   const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();

//   useEffect(() => {
//     if (genres) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: genres[0]?._id || "",
//       }));
//       console.log(genres[0]?._id);
//     }
//   }, [genres]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "genre") {
//       const selectedGenre = genres.find((genre) => genre.name === value);
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: selectedGenre ? selectedGenre._id : "",
//       }));
//       // console.log(selectedGenre.name);
//     } else {
//       setMovieData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };
//   // const handleGenreChange = (e) => {
//   //   const { value } = e.target;
//   //   setMovieData((prevData) => ({
//   //     ...prevData,
//   //     genre: value,
//   //   }));
//   // };

//   const handleGenreChange = (e, genreId) => {
//     const isChecked = e.target.checked;
//     if (isChecked) {
//       setSelectedGenres([...selectedGenres, genreId]);
//     } else {
//       setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   // const handleCreateMovie = async () => {
//   //   try {
//   //     if (
//   //       !movieData.name ||
//   //       !movieData.year ||
//   //       !movieData.detail ||
//   //       !movieData.cast ||
//   //       !selectedImage
//   //     ) {
//   //       toast.error("Please fill all required fields");
//   //       return;
//   //     }
//   //     let upLoadedImagePath = null;

//   //     if (selectedImage) {
//   //       const formData = new FormData();

//   //       formData.append("image", selectedImage);

//   //       const uploadImageResponse = await uploadImage(formData);

//   //       // console.log(uploadImageResponse);

//   //       if (uploadImageResponse.data) {
//   //         upLoadedImagePath = uploadImageResponse.data.Image;
//   //         // console.log(upLoadedImagePath);
//   //       } else {
//   //         console.error("Failed to upload image: ", uploadImageErrorDetails);

//   //         toast.error("Failed to upload image");
//   //         return;
//   //       }

//   //       await createMovie({
//   //         ...movieData,
//   //         image: upLoadedImagePath,
//   //       });

//   //       navigate("/admin/movies-list");

//   //       setMovieData({
//   //         name: "",
//   //         year: 0,
//   //         detail: "",
//   //         cast: [],

//   //         image: null,
//   //         genre: "",
//   //       });

//   //       toast.success("Movie Added to Database");
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to create movie:", createMovieErrorDetail);
//   //     toast.error(
//   //       `Failed to create a movie: ${createMovieErrorDetail?.message}`
//   //     );
//   //   }
//   // };
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const handleCreateMovie = async () => {
//     try {
//       if (
//         !movieData.name ||
//         !movieData.year ||
//         !movieData.detail ||
//         !movieData.cast.length ||
//         !selectedImage ||
//         !selectedGenres.length
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }
//       let upLoadedImagePath = null;

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

//         await createMovie({
//           ...movieData,
//           image: upLoadedImagePath,
//           genre: selectedGenres,
//         });

//         navigate("/admin/movies-list");

//         setMovieData({
//           name: "",
//           year: 0,
//           detail: "",
//           cast: [],
//           image: null,
//           genre: [],
//         });

//         setSelectedGenres([]);

//         toast.success("Movie Added to Database");
//       }
//     } catch (error) {
//       console.error("Failed to create movie:", createMovieErrorDetail);
//       toast.error(
//         `Failed to create a movie: ${createMovieErrorDetail?.message}`
//       );
//     }
//   };

//   return (
//     <div className="container flex justify-center items-center mt-4">
//       <form>
//         <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>

//         <div className="mb-4">
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={movieData.name}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
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
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Detail:
//             <textarea
//               name="detail"
//               value={movieData.detail}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
//             ></textarea>
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
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         {/* <div className="mb-4">
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
//         </div> */}
//         <div className="mb-4">
//           <label className="block">
//             Genre:
//             {isLoadingGenres ? (
//               <div>Loading genres...</div>
//             ) : (
//               genres.map((genre) => (
//                 <div key={genre._id}>
//                   <input
//                     type="checkbox"
//                     id={genre._id}
//                     value={genre._id}
//                     checked={selectedGenres.includes(genre._id)}
//                     onChange={(e) => handleGenreChange(e, genre._id)}
//                   />
//                   <label htmlFor={genre._id}>{genre.name}</label>
//                 </div>
//               ))
//             )}
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
//           onClick={handleCreateMovie}
//           className="bg-teal-500 text-white px-4 py-2 rounded"
//           disabled={isCreatingMovie || isUploadingImage}
//         >
//           {isCreatingMovie || isUploadingImage ? "Creating..." : "Create movie"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateMovie;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateMovieMutation,
//   useUploadImageMutation,
// } from "../../redux/api/movies";
// import { useGetGenresQuery } from "../../redux/api/genre";
// import { toast } from "react-toastify";

// const CreateMovie = () => {
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: 0,
//     detail: "",
//     cast: [],
//     image: null,
//     genre: [], // Change to array for multiple selections
//   });

//   const [selectedImage, setSelectedImage] = useState(null);

//   const [
//     createMovie,
//     { isLoading: isCreatingMovie, error: createMovieErrorDetail },
//   ] = useCreateMovieMutation();

//   const [
//     uploadImage,
//     { isLoading: isUploadingImage, error: uploadImageErrorDetails },
//   ] = useUploadImageMutation();

//   const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();

//   useEffect(() => {
//     if (genres) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: [genres[0]?._id] || [], // Default to an empty array
//       }));
//     }
//   }, [genres]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleGenreChange = (e) => {
//     const { options } = e.target;
//     const selectedGenres = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selectedGenres.push(options[i].value);
//       }
//     }
//     setMovieData((prevData) => ({
//       ...prevData,
//       genre: selectedGenres,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleCreateMovie = async () => {
//     try {
//       // Validation checks
//       if (
//         !movieData.name ||
//         !movieData.year ||
//         !movieData.detail ||
//         !movieData.cast.length ||
//         !selectedImage ||
//         movieData.genre.length === 0
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       // Uploading image
//       let upLoadedImagePath = null;
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

//       // Creating movie
//       await createMovie({
//         ...movieData,
//         image: upLoadedImagePath,
//       });

//       // Navigating and resetting form data
//       navigate("/admin/movies-list");
//       setMovieData({
//         name: "",
//         year: 0,
//         detail: "",
//         cast: [],
//         image: null,
//         genre: [],
//       });

//       // Success message
//       toast.success("Movie Added to Database");
//     } catch (error) {
//       console.error("Failed to create movie:", createMovieErrorDetail);
//       toast.error(
//         `Failed to create a movie: ${createMovieErrorDetail?.message}`
//       );
//     }
//   };

//   return (
//     <div className="container flex justify-center items-center mt-4">
//       <form>
//         <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
//         <div className="mb-4">
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={movieData.name}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
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
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Detail:
//             <textarea
//               name="detail"
//               value={movieData.detail}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
//             ></textarea>
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
//               className="border px-2 py-1 w-full"
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
//               multiple={true} // Allow multiple selections
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
//                 : { border: "0", borderRadius: "0", padding: "0" }
//             }
//           >
//             {!selectedImage && "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: !selectedImage ? "none" : "block" }}
//             />
//           </label>
//         </div>
//         <button
//           type="button"
//           onClick={handleCreateMovie}
//           className="bg-teal-500 text-white px-4 py-2 rounded"
//           disabled={isCreatingMovie || isUploadingImage}
//         >
//           {isCreatingMovie || isUploadingImage ? "Creating..." : "Create movie"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateMovie;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateMovieMutation,
//   useUploadImageMutation,
// } from "../../redux/api/movies";
// import { useGetGenresQuery } from "../../redux/api/genre";
// import { toast } from "react-toastify";

// const CreateMovie = () => {
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: 0,
//     detail: "",
//     cast: [],
//     image: null,
//     genre: [],
//   });

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedGenre, setSelectedGenre] = useState("");

//   const [
//     createMovie,
//     { isLoading: isCreatingMovie, error: createMovieErrorDetail },
//   ] = useCreateMovieMutation();

//   const [
//     uploadImage,
//     { isLoading: isUploadingImage, error: uploadImageErrorDetails },
//   ] = useUploadImageMutation();

//   const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();

//   useEffect(() => {
//     if (genres) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: [genres[0]?._id] || [],
//       }));
//     }
//   }, [genres]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleGenreChange = (e) => {
//     setSelectedGenre(e.target.value);
//   };

//   const handleAddGenre = () => {
//     if (selectedGenre && !movieData.genre.includes(selectedGenre)) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: [...prevData.genre, selectedGenre],
//       }));
//     }
//     setSelectedGenre("");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleCreateMovie = async () => {
//     try {
//       if (
//         !movieData.name ||
//         !movieData.year ||
//         !movieData.detail ||
//         !movieData.cast.length ||
//         !selectedImage ||
//         movieData.genre.length === 0
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       let upLoadedImagePath = null;
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

//       await createMovie({
//         ...movieData,
//         image: upLoadedImagePath,
//       });

//       navigate("/admin/movies-list");
//       setMovieData({
//         name: "",
//         year: 0,
//         detail: "",
//         cast: [],
//         image: null,
//         genre: [],
//       });

//       toast.success("Movie Added to Database");
//     } catch (error) {
//       console.error("Failed to create movie:", createMovieErrorDetail);
//       toast.error(
//         `Failed to create a movie: ${createMovieErrorDetail?.message}`
//       );
//     }
//   };

//   return (
//     <div className="container flex justify-center items-center mt-4">
//       <form>
//         <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
//         <div className="mb-4">
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={movieData.name}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
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
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Detail:
//             <textarea
//               name="detail"
//               value={movieData.detail}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
//             ></textarea>
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
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Genre:
//             <select
//               name="genre"
//               value={selectedGenre}
//               onChange={handleGenreChange}
//               className="border px-2 py-1 w-full text-black"
//             >
//               <option value="">Select Genre</option>
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
//             <button
//               type="button"
//               onClick={handleAddGenre}
//               className="bg-teal-500 text-white px-4 py-2 rounded ml-2"
//             >
//               Add
//             </button>
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
//                 : { border: "0", borderRadius: "0", padding: "0" }
//             }
//           >
//             {!selectedImage && "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: !selectedImage ? "none" : "block" }}
//             />
//           </label>
//         </div>
//         <button
//           type="button"
//           onClick={handleCreateMovie}
//           className="bg-teal-500 text-white px-4 py-2 rounded"
//           disabled={isCreatingMovie || isUploadingImage}
//         >
//           {isCreatingMovie || isUploadingImage ? "Creating..." : "Create movie"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateMovie;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   useCreateMovieMutation,
//   useUploadImageMutation,
// } from "../../redux/api/movies";
// import { useGetGenresQuery } from "../../redux/api/genre";
// import { toast } from "react-toastify";

// const CreateMovie = () => {
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: 0,
//     detail: "",
//     cast: [],
//     image: null,
//     genre: [],
//   });

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedGenre, setSelectedGenre] = useState("");

//   const [
//     createMovie,
//     { isLoading: isCreatingMovie, error: createMovieErrorDetail },
//   ] = useCreateMovieMutation();

//   const [
//     uploadImage,
//     { isLoading: isUploadingImage, error: uploadImageErrorDetails },
//   ] = useUploadImageMutation();

//   const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();

//   useEffect(() => {
//     if (genres) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: [genres[0]?._id] || [],
//       }));
//     }
//   }, [genres]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleGenreChange = (e) => {
//     setSelectedGenre(e.target.value);
//   };

//   const handleAddGenre = () => {
//     if (selectedGenre && !movieData.genre.includes(selectedGenre)) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: [...prevData.genre, selectedGenre],
//       }));
//     }
//     setSelectedGenre("");
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleCreateMovie = async () => {
//     try {
//       if (
//         !movieData.name ||
//         !movieData.year ||
//         !movieData.detail ||
//         !movieData.cast.length ||
//         !selectedImage ||
//         movieData.genre.length === 0
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       let upLoadedImagePath = null;
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

//       await createMovie({
//         ...movieData,
//         image: upLoadedImagePath,
//       });

//       navigate("/admin/movies-list");
//       setMovieData({
//         name: "",
//         year: 0,
//         detail: "",
//         cast: [],
//         image: null,
//         genre: [],
//       });

//       toast.success("Movie Added to Database");
//     } catch (error) {
//       console.error("Failed to create movie:", createMovieErrorDetail);
//       toast.error(
//         `Failed to create a movie: ${createMovieErrorDetail?.message}`
//       );
//     }
//   };

//   return (
//     <div className="container flex justify-center items-center mt-4">
//       <form>
//         <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
//         <div className="mb-4">
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={movieData.name}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
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
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Detail:
//             <textarea
//               name="detail"
//               value={movieData.detail}
//               onChange={handleChange}
//               className="border px-2 py-1 w-full"
//             ></textarea>
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
//               className="border px-2 py-1 w-full"
//             />
//           </label>
//         </div>
//         <div className="mb-4">
//           <label className="block">
//             Genre:
//             <select
//               name="genre"
//               value={selectedGenre}
//               onChange={handleGenreChange}
//               className="border px-2 py-1 w-full text-black"
//             >
//               <option value="">Select Genre</option>
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
//             <button
//               type="button"
//               onClick={handleAddGenre}
//               className="bg-teal-500 text-white px-4 py-2 rounded ml-2"
//             >
//               Add
//             </button>
//           </label>
//           {movieData.genre.length > 0 && (
//             <div className="mt-2">
//               Selected Genres:{" "}
//               {movieData.genre.map((genreId, index) => (
//                 <span
//                   key={index}
//                   className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
//                 >
//                   {genres.find((genre) => genre._id === genreId)?.name}
//                 </span>
//               ))}
//             </div>
//           )}
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
//                 : { border: "0", borderRadius: "0", padding: "0" }
//             }
//           >
//             {!selectedImage && "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{ display: !selectedImage ? "none" : "block" }}
//             />
//           </label>
//         </div>
//         <button
//           type="button"
//           onClick={handleCreateMovie}
//           className="bg-teal-500 text-white px-4 py-2 rounded"
//           disabled={isCreatingMovie || isUploadingImage}
//         >
//           {isCreatingMovie || isUploadingImage ? "Creating..." : "Create movie"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateMovie;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useGetGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    image: null,
    genre: [],
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();

  // useEffect(() => {
  //   if (genres) {
  //     setMovieData((prevData) => ({
  //       ...prevData,
  //       genre: [genres[0]?._id] || [],
  //     }));
  //   }
  // }, [genres]);
  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: [],
      }));
    }
  }, [genres]);

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

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast.length ||
        !selectedImage ||
        movieData.genre.length === 0
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let upLoadedImagePath = null;
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

      await createMovie({
        ...movieData,
        image: upLoadedImagePath,
      });

      navigate("/admin/movies-list");
      // window.location.reload();
      setMovieData({
        name: "",
        year: 0,
        detail: "",
        cast: [],
        image: null,
        genre: [],
      });

      toast.success("Movie Added to Database");
    } catch (error) {
      console.error("Failed to create movie:", createMovieErrorDetail);
      toast.error(
        `Failed to create a movie: ${createMovieErrorDetail?.message}`
      );
    }
  };

  return (
    <div className="container flex justify-center items-center mt-4">
      <form>
        <p className="text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
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
              className="border px-2 py-1 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            ></textarea>
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
              className="border px-2 py-1 w-full"
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
              className="bg-teal-500 text-white px-4 py-2 rounded mt-2"
            >
              Add
            </button>
          </label>
          {movieData.genre.length > 0 && (
            <div className="mt-2">
              Selected Genres:{" "}
              {movieData.genre.map((genreId, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                >
                  {genres.find((genre) => genre._id === genreId)?.name}
                  <button
                    type="button"
                    onClick={() => handleRemoveGenre(genreId)}
                    className="ml-2"
                  >
                    &#10006;
                  </button>
                </span>
              ))}
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
          onClick={handleCreateMovie}
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
