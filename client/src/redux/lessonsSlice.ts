import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LessonState {
  lessons: string[];
  completedLessons: string[];
}

const initialState: LessonState = {
  lessons: ['Introduction', 'Base Position', 'Lesson 1', 'Lesson 2', 'Lesson 3', 'Lesson 4'],
  completedLessons: [],
};

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    completeLesson: (state, action: PayloadAction<string>) => {
      if (!state.completedLessons.includes(action.payload)) {
        state.completedLessons.push(action.payload);
      }
    },
  },
});

export const { completeLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;
