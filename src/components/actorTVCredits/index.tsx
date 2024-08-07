import React from "react";
import { Grid, Box } from "@mui/material";
import { BaseTvShowListProps } from "../../types/interfaces";
import TvShowList from "../tvList";

const ActorTvCredits: React.FC<BaseTvShowListProps> = ({ tvShows, action }) => {
  const tvShowsWithPoster = tvShows.filter((tvShow) => tvShow.poster_path);
  return (
    <Box sx={{ textAlign: "center" }}>
      <Grid container spacing={5} sx={{ padding: "20px" }}>
        <TvShowList action={action} tvShows={tvShowsWithPoster}></TvShowList>
      </Grid>
    </Box>
  );
};

export default ActorTvCredits;