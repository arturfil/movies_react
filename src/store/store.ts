import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import movieReducer from '../features/movies/movieSlice';
import genreReducer from '../features/genres/genreSlice';

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        genres: genreReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;