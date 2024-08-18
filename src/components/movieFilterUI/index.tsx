import React from "react";
import FilterCard from "../filterMoviesCard";
import { BaseMovieProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
  return movie.title.toLowerCase().includes(value.toLowerCase());
};

export const genreFilter = (movie: BaseMovieProps, value: string): boolean => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids || []; // Handle case where genre_ids might be undefined
  return genreId === 0 || genreIds.includes(genreId);
};

const styles = {
  root: {
    marginBottom: '20px',
  },
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortOrderChange: (order: string) => void;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  onSortOrderChange,
}) => {
  return (
    <div style={styles.root}>
      <FilterCard
        onUserInput={onFilterValuesChange}
        titleFilter={titleFilter}
        genreFilter={genreFilter}
        onSortOrderChange={onSortOrderChange}
      />
    </div>
  );
};

export default MovieFilterUI;
