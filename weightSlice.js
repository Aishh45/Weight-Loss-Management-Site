import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const weightSlice = createSlice({
  name: 'weights',
  initialState,
  reducers: {
    setWeights: (state, action) => {
      return action.payload;
    },

    addWeight: (state, action) => {
      const { username, entry } = action.payload;
      if (!state[username]) {
        state[username] = [];
      }

      // Prevent duplicate entry for the same date
      const exists = state[username].some(w => w?.date === entry.date);
      if (exists) return;

      const id = Date.now().toString();
      state[username].push({
        ...entry,
        id,
        timestamp: new Date().toLocaleString(), // optional: for better tracking
      });
    },

    editWeight: (state, action) => {
      const { username, id, newValue } = action.payload;
      const userWeights = state[username] || [];
      const index = userWeights.findIndex(w => w?.id === id);
      if (index !== -1) {
        state[username][index].value = newValue;
        state[username][index].timestamp = new Date().toLocaleString(); // update timestamp
      }
    },

    deleteWeight: (state, action) => {
      const { username, id } = action.payload;
      state[username] = (state[username] || []).filter(w => w?.id !== id);
    }
  }
});

export const { setWeights, addWeight, editWeight, deleteWeight } = weightSlice.actions;
export default weightSlice.reducer;
