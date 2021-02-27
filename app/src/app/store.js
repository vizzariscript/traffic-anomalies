import { configureStore } from '@reduxjs/toolkit';
import anomaliesReducer from '../features/anomalies/anomaliesSlice';

export default configureStore({
  reducer: {
    anomalies: anomaliesReducer,
  },
});
