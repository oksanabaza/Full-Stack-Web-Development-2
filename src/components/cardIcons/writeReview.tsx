import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { BaseMovieProps } from "../../types/interfaces";
import { Link } from "react-router-dom";

interface WriteReviewIconProps {
  movie: BaseMovieProps;
}

const WriteReviewIcon: React.FC<WriteReviewIconProps> = ({ movie }) => {
  return (
    <Link
      to={'/reviews/form'}
      state={{
        movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
