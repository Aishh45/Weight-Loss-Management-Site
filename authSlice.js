import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user || null,
  },
  reducers: {
    signup: (state, action) => {
      // Only handle Redux state, no longer touch localStorage here
      state.user = action.payload;
    },
    login: (state, action) => {
      // Set user in state (already saved to localStorage in Login.js)
      state.user = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('user'); // Don't remove signedUpUser
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { signup, login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
