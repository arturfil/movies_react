import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MoviesPage from "./features/movies/MoviesPage";
import Sidenav from "./components/sidenav/Sidenav";
import { Grid } from "@mui/material";
import SingleMoviePage from "./features/movies/SingleMoviePage";
import GenresPage from "./features/genres/GenresPage";
import MoviesByGenrePage from "./features/movies/MoviesByGenrePage";
import AddMoviePage from "./features/movies/AddMoviePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="bottom-right" />
      <Grid container>
        <Grid
          item
          md={3}
          xs={6}
          style={{
            display: "flex",
            justifyContent: "center",
            background: "linear-gradient(45deg, #4287f5, #16c7b2)",
            minHeight: "100vh",
          }}
        >
          <Sidenav />
        </Grid>
        <Grid item md={9} xs={6}>
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route
              path="/movies/genre/:genre_id"
              element={<MoviesByGenrePage />}
            />
            <Route path="/addMovie" element={<AddMoviePage/>} />
            <Route path="/editMovie/:id" element={<AddMoviePage/>} />
            <Route path="/movie/:id" element={<SingleMoviePage />} />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
