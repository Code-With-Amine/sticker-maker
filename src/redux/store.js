import { configureStore } from '@reduxjs/toolkit';
import pageSizeReducer from '../features/pageSize';
import stickersImagesReducer from '../features/images';

export const store = configureStore({
  reducer: {
    pageSize: pageSizeReducer,
    stickersImages: stickersImagesReducer
  },
})
