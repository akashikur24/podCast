import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/userSlice";
import podcastReducer from "./Slices/podcastSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    podcast: podcastReducer,
    // episode: episodeReducer,
  },
});
