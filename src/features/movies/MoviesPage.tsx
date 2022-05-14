import {
  Chip,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MovieCard from "../../components/moviecard/MovieCard";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getMovies, getMoviesGraphql } from "./movieSlice";

export default function MoviesPage() {
  const dispatch = useAppDispatch();
  const { movies, loading, errors } = useAppSelector((state) => state.movies);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const obj = {
      payload: `
      {
        list {
          id
          title
          description
          runtime
          year
        }
      }
    `,
    searchMode: false
    }
    dispatch(
      getMoviesGraphql(obj)
    );
  }, []);

  useEffect(() => {
    const obj = {
      payload: `
      {
        search(titleContains: "${searchTerm}") {
          id
          title
          description
          year
          description
        }
      }
    `,
    searchMode: true
    }
    dispatch(getMoviesGraphql(obj))
  }, [searchTerm])

  return (
    <Container sx={{ margin: 10 }}>
      <Grid container>
        <Grid>
          <h2>Movies Page</h2>
        </Grid>
        <Grid xs={12} item sx={{margin: '60px 0'}}>
          <FormControl fullWidth >
            <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
            <OutlinedInput
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              id="outlined-adornment-amount"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon/>
                  </IconButton>
                </InputAdornment>}
              label="Amount"
            />
          </FormControl>
        </Grid>
      </Grid>
      {loading && <h4>Loading...</h4>}
      <Grid container spacing={5}>
        {movies &&
          movies?.map((movie) => (
            <Grid item xs={12} md={6} lg={4} key={movie.id}>
              <MovieCard movieProps={movie} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
