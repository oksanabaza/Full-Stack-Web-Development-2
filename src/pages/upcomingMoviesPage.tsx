// @ts-nocheck
import React, {useMemo} from 'react';
import PageTemplate from '../components/templateMovieListPage';
import { BaseMovieProps } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist'
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies } from '../types/interfaces';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Grid from "@mui/material/Grid";

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

const UpcomingMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    'upcoming',
    getUpcomingMovies,
    {
      staleTime: 1000 * 60 * 5, // 5 min
      cacheTime: 1000 * 60 * 60, // 60 min
      refetchOnWindowFocus: false,
    }
  );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === 'title'
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

	const movies = data ? data.results : [];

	const displayedMovies = useMemo(() => filterFunction(movies), [movies, filterFunction]);

	if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
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
        title='Upcoming Movies'
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToPlaylistIcon {...movie} />}
      />
        </Grid>
      </Grid>
    </>
  );
};
export default React.memo(UpcomingMoviesPage);