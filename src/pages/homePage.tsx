import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import { getSortedByPopularity } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import CustomPagination from '../components/CustomPagination';

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

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", page, sortOrder],
    () => getSortedByPopularity(sortOrder, page),
    {
      keepPreviousData: true,
    }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Step 1: Apply filtering
  const movies = data?.results || [];
  const filteredMovies = filterFunction(movies);

  // Step 2: Calculate pagination based on filtered movies
  const moviesPerPage = 20; // Adjust as per your requirement
  const paginatedMovies = filteredMovies.slice((page - 1) * moviesPerPage, page * moviesPerPage);
  const pageCount = Math.ceil(filteredMovies.length / moviesPerPage);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setPage(1); // Reset to the first page after filtering
  };

  const addToFavourites = (movieId: number) => true;

  return (
    <Grid container spacing={1} mt={10}>
      <Grid item xs={3} >
        <MovieFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
          onSortOrderChange={setSortOrder}
        />
      </Grid>
      <Grid item xs={9}>
        <PageTemplate
          title="Discover Movies"
          movies={paginatedMovies}
          selectFavourite={addToFavourites}
          action={(movie: BaseMovieProps) => {
            return <AddToFavouritesIcon {...movie} />;
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CustomPagination
            count={pageCount}
            page={page}
            onChange={(_event, value) => setPage(value)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
