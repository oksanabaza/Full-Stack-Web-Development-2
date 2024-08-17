import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { BaseMovieProps } from "../types/interfaces";
import { getSortedByPopularity, getMoviesByGenre } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

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
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);


  const genreId = Number(filterValues[1].value);

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", page, sortOrder, genreId],
    () => {
      if (genreId > 0) {
        return getMoviesByGenre(genreId, page, sortOrder);
      } else {
        return getSortedByPopularity(sortOrder, page);
      }
    },
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
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

  const favourites = movies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));
  const addToFavourites = (movieId: number) => true;

  const totalPages = Math.min(data?.total_pages || 0, MAX_PAGES);

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        selectFavourite={addToFavourites}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />;
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortOrderChange={handleSortOrderChange}
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
              color: 'white',
            },
            '& .MuiPaginationItem-ellipsis': {
              color: 'white',
            },
          }}
        />
      </Box>
    </>
  );
};

export default HomePage;
