import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieState {
  title: string;
  image: string;
}

const initialState: MovieState[] = [
  {
    title: "Avengers",
    image: "https://res.cloudinary.com/dolpzhsfn/image/upload/v1715840529/4k-marvel-avengers-endgame-poster-vqifoia5of7yg3ut_e1m1mk.jpg",
  },
  {
    title: "Spider-Man",
    image: "https://res.cloudinary.com/dolpzhsfn/image/upload/v1715841091/spider-man-movies-spider-man-3-wallpaper-preview_shb3sc.jpg",
  },
];

export const movie = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<MovieState[]>) => {
      state = action.payload;
      return state
    },
  },
});

export const { setMovie } = movie.actions;
export default movie.reducer;
