import React from "react";
import Chip from "@mui/material/Chip";
import ListIcon from "@mui/icons-material/List";
import LayersIcon from "@mui/icons-material/Layers";
import Typography from "@mui/material/Typography";
import { TvShowDetailsProps } from "../../types/interfaces";
import { Box } from "@mui/material";


const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chip: {
    color: "#ffffff",
    backgroundColor: "transparent",
    margin: "0.5rem",
    border: "2px solid #ffffff",
    fontSize: "1rem",
  },

  fabContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
  },
  fab: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
    width: "auto",
    height: "auto",
    padding: "0.5rem 1rem",
  },
  overviewText: {
    color: "#ffffff",
    textAlign: "center",
  },
};

const TVShowDetails: React.FC<TvShowDetailsProps> = (tvShow) => {

  return (
    <>
      <Typography variant="h5" component="h3" sx={styles.overviewText}>
        {tvShow.tagline}
      </Typography>
      <Typography variant="h6" component="p" sx={styles.overviewText}>
        {tvShow.overview}
      </Typography>

      <Box sx={styles.chipSet}>
        {tvShow.genres.map((g) => (
          <Chip key={g.name} label={g.name} sx={styles.chip} />
        ))}
      </Box>
      <Box sx={styles.chipSet}>
        <Chip
          icon={<ListIcon />}
          label={`${tvShow.number_of_episodes} episodes`}
          sx={styles.chip}
        />
        <Chip
          icon={<LayersIcon />}
          label={`${tvShow.number_of_seasons} seasons`}
          sx={styles.chip}
        />
        <Chip label={`First Air Date: ${tvShow.first_air_date}`} sx={styles.chip} />
        <Chip label={`Popularity: ${tvShow.popularity}`} sx={styles.chip} />
      </Box>

    </>
  );
};

export default TVShowDetails;