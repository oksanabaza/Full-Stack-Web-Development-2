import React from "react";
import TVShow from "../tvCard";
import Grid from "@mui/material/Grid";
import { BaseTvShowListProps, BaseTvShowProps } from "../../types/interfaces";
import { useTheme } from "@mui/material/styles";

const TVShowList: React.FC<BaseTvShowListProps> = ({ tvShows, action }) => {
  const theme = useTheme();
  // eslint-disable-next-line prefer-const
  let tvShowCards = tvShows.map((tvShow: BaseTvShowProps) => (
    <Grid key={tvShow.id} item xs={12} sm={6} md={4} lg={3} xl={3}   sx={{
      backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#ffffff', 
      color: theme.palette.mode === 'dark' ? 'white' : '#121212', 
      paddingBottom: "10px",
    }}>
      <TVShow key={tvShow.id} tvShow={tvShow} action={action as (tv: BaseTvShowProps) => React.ReactNode} />
    </Grid>
  ));
  return tvShowCards;
}

export default TVShowList;