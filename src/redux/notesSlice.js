import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.tasks.push(action.payload);
    },
    editNote: (state, action) => {
      const { index, text } = action.payload;
      if (index >= 0 && index < state.tasks.length) {
        state.tasks[index] = text;
      }
    },
    deleteNote: (state, action) => {
      state.tasks = state.tasks.filter((_, i) => i !== action.payload);
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
