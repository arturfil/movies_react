import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import GenreCard from '../../components/genrecard/GenreCard';
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getGenres } from './genreSlice';

export default function GenresPage() {
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector(state => state.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [])

  return (
    <Container sx={{marginTop: 10}}>
      <div>
        <Grid container spacing={2}>
          {genres?.map(genre => (
            <GenreCard key={genre.id} genreProps={genre} />
          ))}
        </Grid>
      </div>
    </Container>
  )
}
