import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { setSingleGenre } from "../../features/genres/genreSlice";
import { Genre } from "../../interfaces/Genre";
import { useAppDispatch } from "../../store/store";

interface Props {
  genreProps: Genre;
}

export default function GenreCard({ genreProps }: Props) {
  const dispatch = useAppDispatch();
  return (
    <Grid item xs={4}>
      <Card>
        <CardContent>
          <Typography variant="h6">{genreProps.genre_name}</Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => dispatch(setSingleGenre(genreProps.genre_name))}
            component={Link}
            to={`/movies/genre/${genreProps.id}`}
          >
            More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
