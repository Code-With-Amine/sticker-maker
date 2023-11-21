import { configureStore } from '@reduxjs/toolkit';
import pageSizeReducer from '../features/pageSize';
import stickersImagesReducer from '../features/images';
import printedDivReducer from '../features/printedDiv';

export const store = configureStore({
  reducer: {
    pageSize: pageSizeReducer,
    stickersImages: stickersImagesReducer,
    printedDiv: printedDivReducer
  },
})
