import { Container, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CustomSelector from "../../components/customselector/CustomSelector";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Movie } from "../../interfaces/Movie";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { createMovie, getSingleMovie, updateMovie } from "./movieSlice";
import { toast } from "react-toastify";

export default function AddMoviePage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { singleMovie } = useAppSelector((state) => state.movies);
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie>({
    title: "",
    description: "",
    release_date: "",
    runtime: 0,
    rating: 0,
    mpaa_rating: "",
  });

  const getMovieForEdit = useCallback(async () => {
    if (!id) return;
    console.log("ID", id);
    await dispatch(getSingleMovie(id));
  }, [dispatch]);

  useEffect(() => {
    getMovieForEdit();
  }, []);

  useEffect(() => {
    if (singleMovie !== null) {
      setUpdateMode(true);
      setMovie({
        title: singleMovie?.title,
        description: singleMovie?.description,
        release_date: new Date(singleMovie?.release_date)
          .toISOString()
          .split("T")[0], // return the format of the date
        runtime: singleMovie?.runtime,
        rating: singleMovie?.rating,
        mpaa_rating: singleMovie?.mpaa_rating,
      });
    }
  }, [singleMovie]);

  useEffect(() => {
    setMovie({
      title: "",
      description: "",
      release_date: "",
      runtime: 0,
      rating: 0,
      mpaa_rating: "",
    });
  }, [id]);

  const handleSubmit = (e: any) => {
    if (updateMode) {
      movie.id = id; // add id if its an edit
      dispatch(updateMovie(movie));
      
    } else {
      dispatch(createMovie(movie));
      
    }
    toast.success("Succesfully sent movie data");
    setMovie({
      title: "",
      description: "",
      release_date: "",
      runtime: 0,
      rating: 0,
      mpaa_rating: "",
    })
  };

  return (
    <Container sx={{ marginTop: 10, display: "flex", flexDirection: "column" }}>
      <Grid
        sx={{
          textAlign: "center",
          maxWidth: 500,
          width: 400,
          justifyContent: "center",
          margin: "0 auto",
          backgroundColor: "lightgrey",
          padding: 5,
          borderRadius: 5,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 2 }}>
          {id === undefined ? "Add A Movie" : "Edit Movie"}
        </Typography>
        <Grid className="form" container spacing={3}>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setMovie({ ...movie, title: e?.target.value })}
              value={movie.title}
              fullWidth
              label="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={movie.description}
              rows={5}
              multiline={true}
              onChange={(e) =>
                setMovie({ ...movie, description: e.target.value })
              }
              fullWidth
              label="description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) =>
                setMovie({ ...movie, release_date: e.target.value })
              }
              value={movie.release_date}
              type="date"
              fullWidth
              placeholder="date"
            />
          </Grid>
          <Grid item xs={12}>
            <CustomSelector
              state={movie}
              func={setMovie}
              keyName="mpaa_rating"
              title="MPAA Rating"
              values={["G", "PG", "PG13", "R", "NC17"]}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) =>
                setMovie({ ...movie, rating: parseInt(e.target.value) })
              }
              fullWidth
              label="rating"
              value={movie.rating}
            />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "left" }}>
            <LoadingButton onClick={handleSubmit} variant="contained">
              Subtmit
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
