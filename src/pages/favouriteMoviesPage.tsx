import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (movieIds.length === 0) {
    return <Typography variant="h6">No favourite movies found.</Typography>;
  }

  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

  const isLoading = favouriteMovieQueries.some((q) => q.isLoading);
  const isError = favouriteMovieQueries.some((q) => q.isError);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6">Failed to load favourite movies.</Typography>;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const displayedMovies = filterFunction(allFavourites);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <Grid container spacing={1} mt={10}>
      <Grid item xs={3}>
        <MovieFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
        />
      </Grid>
      <Grid item xs={9}>
        <PageTemplate
          title="Favourite Movies"
          movies={displayedMovies}
          action={(movie) => (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default FavouriteMoviesPage;
