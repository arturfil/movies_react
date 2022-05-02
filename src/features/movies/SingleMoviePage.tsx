import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { deleteMovie, getSingleMovie } from "./movieSlice";
import DialogBox from "../../components/dialogbox/DialogBox";

export default function SingleMovie() {
  const { singleMovie } = useAppSelector((state) => state.movies);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => setOpen(true);
  
  const handleDelete = () => {
    dispatch(deleteMovie(id));
    navigate("/");
    setOpen(false);
  }

  useEffect(() => {
    dispatch(getSingleMovie(id));
  }, [id]);

  return (
    <Container sx={{ margin: 5 }}>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <img
            height={330}
            src="https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/226610/FND_poster_Sonic2_InTheaters.jpg"
            alt=""
          />
        </Grid>
        <Grid item xs={8}>
          <img
            width={700}
            height={330}
            src="https://static1.srcdn.com/wordpress/wp-content/uploads/2022/03/Shadow-2.jpg"
            alt=""
          />
        </Grid>
      </Grid>
      <h2>{singleMovie?.title}</h2>
      <h4>{singleMovie?.description}</h4>
      <Button
        variant="contained"
        component={Link}
        to={`/editMovie/${singleMovie?.id}`}
      >
        Edit Movie
      </Button>
      <DialogBox
        handleClickOpen={handleClickOpen}
        open={open}
        setOpen={setOpen}
        handleClose={handleDelete}
      />
      {singleMovie?.genres && Object.keys(singleMovie.genres).length > 0 && (
        <>
          <h2>Genres</h2>
          <Box sx={{ width: "100%", bgcolor: "lightgrey", borderRadius: 1 }}>
            <List>
              {Object.values(singleMovie.genres).map((genre) => (
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary={genre} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      )}
    </Container>
  );
}
