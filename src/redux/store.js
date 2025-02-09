import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice"; // Ensure correct import path

const store = configureStore({
  reducer: {
    notes: notesReducer, // "notes" must match the key you use in `useSelector`
  },
});

export default store;
