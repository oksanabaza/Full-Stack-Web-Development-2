import React, { useState } from "react";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Input from "@mui/material/Input";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { getGenres } from "../../api/tmdb-api";
import { GenreData, FilterOption } from "../../types/interfaces";

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortOrderChange: (order: string) => void;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  titleFilter,
  // genreFilter,
  onUserInput,
  onSortOrderChange,
}) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [openSort, setOpenSort] = useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

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

  const handleSortChipClick = (order: string) => {
    setSortOrder(order);
    onSortOrderChange(order);
  };

  return (
    <Box>
      {/* Filter Card */}
      <Card
        sx={{
          maxWidth: 345,
          marginBottom: 2,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: 2,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" component="h1">
            Filter
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => setOpenFilters(!openFilters)}
          >
            {openFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={openFilters}>
          <Divider sx={{ marginY: 2 }} />
      
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                clickable
                color={
                  selectedGenres.includes(genre.id.toString())
                    ? "primary"
                    : "default"
                }
                onClick={() => handleGenreClick(genre.id.toString())}
              />
            ))}
          </Box>
          <Box>
          <Input
            id="title-filter"
            fullWidth
            placeholder="Search..."
            type="search"
            value={titleFilter}
            onChange={handleTextChange}
            sx={{
              marginBottom: 2,
              padding: "10px",
              marginTop:"20px",
              // borderRadius: "8px",
              // boxShadow: "inset 0px 2px 5px rgba(0, 0, 0, 0.1)",
              // border: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          /></Box>
        </Collapse>
      </Card>

      {/* Sort Card */}
      <Card
        sx={{
          maxWidth: 345,
          marginBottom: 2,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: 2,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h5" component="h1">
            Sort
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() => setOpenSort(!openSort)}
          >
            {openSort ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
        <Collapse in={openSort}>
          <Divider sx={{ marginY: 2 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            <Chip
              label="Less Popular"
              clickable
              color={sortOrder === "asc" ? "primary" : "default"}
              onClick={() => handleSortChipClick("asc")}
            />
            <Chip
              label="More Popular"
              clickable
              color={sortOrder === "desc" ? "primary" : "default"}
              onClick={() => handleSortChipClick("desc")}
            />
          </Box>
        </Collapse>
      </Card>
    </Box>
  );
};

export default FilterMoviesCard;
