import React from "react"; 
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieTrailer } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { MovieDetailsProps } from "../types/interfaces";

const MovieDetailsPage: React.FC= () => {
  const { id } = useParams();

  const { data: movie, error, isLoading, isError } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  const { data: trailerKey } = useQuery<string | null, Error>(
    ["trailer", id],
    () => getMovieTrailer(Number(id)),
    {
      enabled: !!id, 
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie} trailerKey={trailerKey}>
          <MovieDetails {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
