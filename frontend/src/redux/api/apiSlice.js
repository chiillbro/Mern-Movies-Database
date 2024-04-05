import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

// These are utility functions provided by Redux Toolkit for creating an API interface and performing network requests

import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL }); //base URL that will be used for all API requests.

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
