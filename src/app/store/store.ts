import { configureStore } from '@reduxjs/toolkit';
import personSlice from './personSlice';
import shapeSlice from './shapeSlice';

export const store = configureStore({
  reducer: {
    persons: personSlice,
    shapes: shapeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;