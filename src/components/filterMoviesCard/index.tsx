import React, { useState } from "react";
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
import Chip from '@mui/material/Chip';
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
    minHeight: 250,
    transition: 'height 0.3s ease',
  },
  iconButton: {
    marginLeft: 'auto',
  },
  chipContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
    marginTop: 1,
  },
};

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({ titleFilter, genreFilter, onUserInput, onSortOrderChange }) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [releaseDateStart, setReleaseDateStart] = useState<string>("");
  const [releaseDateEnd, setReleaseDateEnd] = useState<string>("");

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  const genres = data?.genres || [];

  const handleGenreClick = (genreId: string) => {
    const currentIndex = selectedGenres.indexOf(genreId);
    const newSelectedGenres = [...selectedGenres];

    if (currentIndex === -1) {
      newSelectedGenres.push(genreId);
    } else {
      newSelectedGenres.splice(currentIndex, 1);
    }

    setSelectedGenres(newSelectedGenres);
    onUserInput("genre", newSelectedGenres.join(","));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUserInput("title", e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const order = e.target.value as string;
    setSortOrder(order);
    onSortOrderChange(order);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRatingFilter(value);
    onUserInput("rating", value.toString());
  };

  const handleReleaseDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReleaseDateStart(e.target.value);
    onUserInput("release_date_start", e.target.value);
  };

  const handleReleaseDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReleaseDateEnd(e.target.value);
    onUserInput("release_date_end", e.target.value);
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
          <Box sx={styles.chipContainer}>
            {genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                clickable
                color={selectedGenres.includes(genre.id.toString()) ? "primary" : "default"}
                onClick={() => handleGenreClick(genre.id.toString())}
              />
            ))}
          </Box>
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
        <CustomTextField
          id="sort-order"
          label="Sort Order"
          select
          value={sortOrder}
          onChange={handleSortChange}
          SelectProps={{ native: true }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </CustomTextField>
      </CardContent>
    </Card>
  );
};

export default FilterMoviesCard;
