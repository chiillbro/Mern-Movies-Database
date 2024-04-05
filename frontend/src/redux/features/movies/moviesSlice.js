import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: [],
    },
    filteredMovies: [],
    movieYears: [],
    uniqueYear: [],
  },
  reducers: {
    setMoviesFilter: (state, action) => {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },

    setFilteredMovies: (state, action) => {
      state.filteredMovies = action.payload;
    },
    setMoviesYears: (state, action) => {
      state.movieYears = action.payload;
    },
    setUniqueYears: (state, action) => {
      state.uniqueYear = action.payload;
    },
  },
});

export const {
  setFilteredMovies,
  setMoviesYears,
  setUniqueYears,
  setMoviesFilter,
} = moviesSlice.actions;

export default moviesSlice.reducer;
