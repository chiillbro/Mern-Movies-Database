import { configureStore } from "@reduxjs/toolkit"; // This function is used to create a Redux store with predefined settings for development and production environments.

import { setupListeners } from "@reduxjs/toolkit/query/react"; //This function is used to set up event listeners for automatic query lifecycle management when using Redux Toolkit's query features.

import authReducer from "./features/auth/authSlice"; // reducers for the authentication feature (authReducer) and the API slice (apiSlice)
import { apiSlice } from "./api/apiSlice";

import moviesReducer from "../redux/features/movies/moviesSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), //The apiSlice.middleware contains middleware for handling asynchronous API requests using Redux Toolkit's query features
  devTools: true, // It enables Redux DevTools for debugging Redux state changes in development mode
});

setupListeners(store.dispatch); //This ensures that query lifecycles are managed properly, including caching, background polling, and error handling.

export default store;
