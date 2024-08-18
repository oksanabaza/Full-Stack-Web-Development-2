import React from "react";
import { Grid, Box } from "@mui/material";
import { BaseMovieListProps } from "../../types/interfaces";
import MovieList from "../movieList";

const ActorCredits: React.FC<BaseMovieListProps> = ({ movies, action, selectFavourite }) => {
  const moviesWithPoster = movies.filter((movie) => movie.poster_path);
  
  return (
    <Box sx={{ textAlign: "center" }}>
      <Grid container spacing={5} sx={{ padding: "20px" }}>
        <MovieList action={action} movies={moviesWithPoster} selectFavourite={selectFavourite} />
      </Grid>
    </Box>
  );
};

export default ActorCredits;
