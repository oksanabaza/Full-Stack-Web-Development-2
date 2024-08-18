import React from "react"; 
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { DiscoverMovies } from '../types/interfaces';
import { getPopularMovies } from "../api/tmdb-api";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import imgPlaceholder from '../images/film-poster-placeholder.png';

const PopularMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    'popular',
    getPopularMovies,
    {
      staleTime: 1000 * 60 * 5, // 5 min
      cacheTime: 1000 * 60 * 60, // 60 min
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h4" color="error">{(error as Error).message}</Typography>;
  }

  const movies = data ? data.results : [];

  return (
    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        Popular Movies
      </Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : imgPlaceholder
                  }
                  alt={movie.title}
                />
                {/* <CardContent>
                  <Typography variant="h6" component="h2">
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Release Date: {movie.release_date}
                  </Typography>
                </CardContent> */}
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PopularMoviesPage;
