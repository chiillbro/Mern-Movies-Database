import { createSlice } from "@reduxjs/toolkit"; // createSlice is a utility function from Redux Toolkit for generating slice reducers, action creators, and action types all at once.

// the initial state of the authentication slice.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// used createSlice to define a slice of state named "auth".
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // state: Represents the current state of the Redux slice
    // action: Represents the action dispatched to trigger this action creator. The action typically contains a payload with the new authentication data.
    setCredentials: (state, action) => {
      state.userInfo = action.payload; //It updates the userInfo field in the state with the payload provided in the action
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); //stores the user credentials in the browser's localStorage under the key "userInfo". The credentials are converted to a JSON string using JSON.stringify() before storing

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
