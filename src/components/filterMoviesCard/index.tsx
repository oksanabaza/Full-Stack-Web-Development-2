import React, { ChangeEvent, useState } from "react";
import { FilterOption, GenreData } from "../../types/interfaces";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from '@mui/material/Box';
import CustomSelect from '../CustomSelect'; // Adjust path if needed
import CustomTextField from '../CustomTextField'; // Adjust path if needed

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortOrderChange: (order: string) => void;
}

const styles = {
  card: {
    maxWidth: 345,
    marginBottom: 2,
    minHeight: 250, // Set a fixed minimum height
    transition: 'height 0.3s ease', // Smooth height transition
  },
  iconButton: {
    marginLeft: 'auto',
  },
};

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput, onSortOrderChange }) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [releaseDateStart, setReleaseDateStart] = useState<string>("");
  const [releaseDateEnd, setReleaseDateEnd] = useState<string>("");

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  const genres = data?.genres || [];
  const genreOptions = [{ value: "0", label: "All" }, ...genres.map(g => ({ value: g.id, label: g.name }))];

  const handleChange = (type: FilterOption, value: string) => {
    onUserInput(type, value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange("title", e.target.value);
  };

  const handleGenreChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    handleChange("genre", e.target.value as string);
  };

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const order = e.target.value as string;
    setSortOrder(order);
    onSortOrderChange(order);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRatingFilter(value);
    handleChange("rating", value.toString());
  };

  const handleReleaseDateStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReleaseDateStart(e.target.value);
    handleChange("release_date_start", e.target.value);
  };

  const handleReleaseDateEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReleaseDateEnd(e.target.value);
    handleChange("release_date_end", e.target.value);
  };

  return (
    <Card sx={styles.card} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <IconButton
            sx={styles.iconButton}
            onClick={() => setOpenFilters(!openFilters)}
          >
            {openFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={openFilters}>
          <CustomTextField
            id="title-filter"
            label="Search field"
            type="search"
            value={titleFilter}
            onChange={handleTextChange}
          />
          <CustomSelect
            value={genreFilter}
            onChange={handleGenreChange}
            options={genreOptions}
            label="Genre"
          />
          <CustomTextField
            id="rating-filter"
            label="Rating"
            type="number"
            value={ratingFilter}
            onChange={handleRatingChange}
          />
          <CustomTextField
            id="release-date-start"
            label="Release Date Start"
            type="date"
            value={releaseDateStart}
            onChange={handleReleaseDateStartChange}
          />
          <CustomTextField
            id="release-date-end"
            label="Release Date End"
            type="date"
            value={releaseDateEnd}
            onChange={handleReleaseDateEndChange}
          />
        </Collapse>
      </CardContent>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
          </Typography>
        </Box>
        <CustomSelect
          value={sortOrder}
          onChange={handleSortChange}
          options={[
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          label="Sort Order"
        />
      </CardContent>
    </Card>
  );
};

export default FilterMoviesCard;
