import {configureStore} from '@reduxjs/toolkit';
import MouviesSlices from './MouviesSlices';
import AuthSlices from './AuthSlices';
const store = configureStore({
  reducer: {
    movies: MouviesSlices,
    auth: AuthSlices,
  },
});
export default store;
