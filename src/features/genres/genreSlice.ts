import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Genre } from "../../interfaces/Genre";

interface GenreState {
    genres: Genre[] | null;
    singleGenre: Genre | null;
    loading: boolean;
    errors: [] | any;
}

const initialState: GenreState = {
    genres:[],
    singleGenre: null,
    loading: false,
    errors: []
}

export const getGenres = createAsyncThunk<Genre[]>(
    "genres/getGenres",
    async (_, thunkAPI) => {
        try {
            const response = await agent('/genres');
            return response.data.genres;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const genreSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {
        setGenres: (state, action: PayloadAction<Genre[]>) => {
            state.genres = action.payload;
        },
        setSingleGenre: (state, action) => {
            state.singleGenre = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getGenres.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getGenres.fulfilled, (state, action) => {
            state.loading = false;
            state.genres = action.payload;
        });
        builder.addCase(getGenres.rejected, (state, action) => {
            state.errors = action.payload;
            state.loading = false;
        })
    }
});

export default genreSlice.reducer;
export const { setGenres, setSingleGenre } = genreSlice.actions;
