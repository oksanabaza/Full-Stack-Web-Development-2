import React from "react";
import FilterCard from "../filterMoviesCard";
import { BaseMovieProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
  root: {

  },
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortOrderChange: (order: string) => void;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter, onSortOrderChange }) => {
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
