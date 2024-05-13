import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice';
import countdownReducer from './countdownSlice';
import sentenceReducer from './sentence';
import lessonsReducer from './lessonsSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    countdown: countdownReducer,
    sentence: sentenceReducer,
    lessons: lessonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
