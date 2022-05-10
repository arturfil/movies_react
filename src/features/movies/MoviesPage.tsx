
import { Container, Grid } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import MovieCard from '../../components/moviecard/MovieCard';
import { useAppDispatch, useAppSelector } from '../../store/store'
import { getMovies } from './movieSlice';

export default function MoviesPage() {
  const dispatch = useAppDispatch();
  const { movies, loading, errors } = useAppSelector(state => state.movies);

  useEffect(() => {
    dispatch(getMovies())
    getGraphQLMethod();
  }, [])
  

  const getGraphQLMethod = async () => {
    const payload = `{
        list {
          id
          title
          runtime
          year
        }
      }`

      
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json")
      
    const requestOptions = {
      method: "POST",
      body: payload,
      headers: {
        "Content-Type": "appliaction/graphql"
      }
    }
    console.log("GraphQL");
    
    const response = await fetch("http://localhost:8080/api/v1/graphql/list", requestOptions)
      .then(response => response.json())
      .then(data => {
        let theList = Object.values(data.data.list);
        return theList;
      })
      .then(theList => {
        console.log(theList);
      })
    console.log(response);
  }

  return (
    <Container sx={{marginTop: 10}}>
      <h2>Movies Page</h2>
      {loading && (
        <h4>Loading...</h4>
      )}
      <Grid container spacing={5}>
        {movies && movies?.map(movie => (
          <Grid item xs={12} md={6} lg={4} key={movie.id}>
            <MovieCard movieProps={movie} />
          </Grid>
        ))}
      </Grid>
      <div>
        <h4>
          {errors.error}
        </h4>
      </div>
    </Container>
  )
}
