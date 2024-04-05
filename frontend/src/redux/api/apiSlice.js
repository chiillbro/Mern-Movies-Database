// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// // These are utility functions provided by Redux Toolkit for creating an API interface and performing network requests

// import { BASE_URL } from "../constants";

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL }); //base URL that will be used for all API requests.

// export const apiSlice = createApi({
//   baseQuery,
//   endpoints: () => ({}),
// });

import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Include credentials to allow cookies to be sent
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    // headers.set(
    //   "Access-Control-Allow-Origin",
    //   "https://movies-database-frontend.vercel.app"
    // );
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
