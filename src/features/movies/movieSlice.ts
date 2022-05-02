import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import agent from "../../api/agent";
import { Movie } from "../../interfaces/Movie";

interface MovieState {
    movies: Movie[] | null;
    singleMovie: Movie | null;
    loading: boolean;
    errors: [] | any;
}

const initialState: MovieState = {
    movies: [],
    singleMovie: null,
    loading: false,
    errors: []
}

export const getMovies = createAsyncThunk<Movie[]>(
    "movies/getMovies",
    async (_, thunkAPI) => {
        try {
            const response = await agent.get("/movies")
            return response.data.movies;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const getSingleMovie = createAsyncThunk<Movie, string|undefined>(
    "movies/getSingleMovie",
    async (id, thunkAPI) => {
        try {
            const response = await agent.get(`/movie/${id}`)
            
            return response.data.movie;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
);

export const getMoviesByGenre = createAsyncThunk<Movie[], string|undefined>(
    "movies/getMoviesByGenre",
    async (id, thunkAPI) => {
        try {
            const response = await agent.get(`/movies/genre/${id}`)
            return response.data.movies;
        } catch (error:any) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const createMovie = createAsyncThunk<Movie, Object>(
    "movies/createMovie",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post(`/admin/createMovie`, data);
            toast.success("Created Movie!")
            return response.data.movies;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const deleteMovie = createAsyncThunk<Movie, string|undefined>(
    "movies/deleteMovie",
    async (id, thunkAPI) => {
        try {
            const response = await agent.delete(`/admin/deleteMovie/${id}`);
            toast.success("Movie deleted successfully!")
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const updateMovie = createAsyncThunk<Movie, Object>(
    "movies/updateMovie",
    async (data, thunkAPI) => {
        try {
            const response = await agent.post(`/admin/updateMovie`, data);
            toast.success("Updated Movie!");
            return response.data.movies;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.message})
        }
    }
)

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.movies = action.payload;
        });
        builder.addCase(getMovies.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload;
        });
        builder.addCase(getSingleMovie.fulfilled, (state, action) => {
            state.singleMovie = action.payload;
        });
        builder.addCase(getMoviesByGenre.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMoviesByGenre.fulfilled, (state, action) => {
            state.movies = action.payload;
            state.loading = false;
        });
    }
});

export default movieSlice.reducer;
export const { setMovies } = movieSlice.actions;