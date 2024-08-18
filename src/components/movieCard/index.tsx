import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/film-poster-placeholder.png';
import { BaseMovieProps } from "../../types/interfaces";
import { Link } from "react-router-dom"; 
// import { MoviesContext } from "../../contexts/moviesContext";
import Tooltip from '@mui/material/Tooltip';


const styles = {
  card: { maxWidth: 345 },
  media: { height: 300 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};
interface MovieCardProps {
  movie: BaseMovieProps;
  action: (m: BaseMovieProps) => React.ReactNode;
}


const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
// const { favourites, addToFavourites } = useContext(MoviesContext);//NEW

// const isFavourite = favourites.find((id) => id === movie.id)? true : false;//NEW

  return (
    <Tooltip title={movie.title} placement="bottom">
    <Card sx={styles.card}>
 <Link to={`/movies/${movie.id}`}>
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      </Link>
    </Card>
    </Tooltip>
  );
}

export default MovieCard;