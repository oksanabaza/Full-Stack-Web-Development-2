import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import { getSortedByPopularity, getMoviesByGenre, searchMoviesByTitle } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Grid from "@mui/material/Grid";
import { useTheme } from '@mui/material/styles';

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

const MAX_PAGES = 500;

const HomePage: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  const titleQuery = filterValues[0].value;
  const genreId = Number(filterValues[1].value);

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", page, sortOrder, genreId, titleQuery],
    () => {
      if (titleQuery) {
        return searchMoviesByTitle(titleQuery, page, sortOrder);
      } else if (genreId > 0) {
        return getMoviesByGenre(genreId, page, sortOrder);
      } else {
        return getSortedByPopularity(sortOrder, page);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
    setPage(1); 
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    setPage(1); 
  };

  const movies = data?.results || [];
  const displayedMovies = filterFunction(movies);

  const sortedMovies = [...displayedMovies].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.popularity - b.popularity;
    } else {
      return b.popularity - a.popularity;
    }
  });

  const favourites = movies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  const addToFavourites = (movieId: number) => true;

  const totalPages = Math.min(data?.total_pages || 0, MAX_PAGES);

  return (
    <Grid container spacing={1} mt={10}>
      <Grid item xs={3}>
        <MovieFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
          onSortOrderChange={handleSortOrderChange}
        />
      </Grid>
      <Grid item xs={9}>
        <PageTemplate
          title="Discover Movies"
          movies={sortedMovies} 
          selectFavourite={addToFavourites}
          action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_event, value) => {
              if (value <= totalPages) {
                setPage(value);
              }
            }}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary,
              },
              '& .MuiPaginationItem-ellipsis': {
                color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary,
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default HomePage;
