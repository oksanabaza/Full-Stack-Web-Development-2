import React, { ChangeEvent, useState } from "react";
import { FilterOption, GenreData } from "../../types/interfaces";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortOrderChange: (order: string) => void;
}

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
    color: 'black',

  },
  select: {
    color: 'black',
    backgroundColor: 'white',
  },
};

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput, onSortOrderChange }) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);
  const [sortOrder, setSortOrder] = useState<string>("desc"); // State to track sort order

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (type: FilterOption, value: string) => {
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange("title", e.target.value);
  };

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange("genre", e.target.value);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order); // Update the sort order state
    onSortOrderChange(order); // Trigger the sort order change in the parent component
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={handleGenreChange}
              sx={styles.select}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
          <FormControl sx={styles.formControl}>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              sx={styles.select}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
