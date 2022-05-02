import { Container, Grid, Typography } from "@mui/material";
import { typography } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/moviecard/MovieCard";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getMovies, getMoviesByGenre } from "./movieSlice";

export default function MoviesByGenrePage() {
  const {movies, loading} = useAppSelector(state => state.movies);
  const {singleGenre} = useAppSelector(state => state.genres);
  const dispatch = useAppDispatch();
  const {genre_id} = useParams();

  console.log(genre_id);

  useEffect(() => {
    dispatch(getMoviesByGenre(genre_id));
  }, [])

  return (
    <Container sx={{marginTop: 10}}>
      <Typography variant="h4" sx={{fontWeight: 600, marginTop: 10}}>{`Movies By Genre ${singleGenre}`} </Typography>
      {movies ? movies?.map(movie => (
        <Grid sx={{marginTop: 2}} key={movie.id}>
          <MovieCard   movieProps={movie} />
        </Grid>
      )) : (
        <Typography variant="h6" sx={{fontWeight: 600, marginTop: 2
        }}>
          No movies found
        </Typography>
      )}
    </Container>
  );
}
