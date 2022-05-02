import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Movie } from "../../interfaces/Movie";
import { Link } from "react-router-dom";

interface Props {
    movieProps: Movie;
}

export default function MovieCard({movieProps}: Props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://lumiere-a.akamaihd.net/v1/images/hb_disneyplus_skywalkersaga_mobile_19267_e964ed2c.jpeg?region=0,0,640,400"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movieProps.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movieProps.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" component={Link} to={`/movie/${movieProps.id}`}>
          <RemoveRedEyeIcon/>
        </Button>
      </CardActions>
    </Card>
  );
}
