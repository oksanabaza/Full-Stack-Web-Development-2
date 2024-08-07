import React, { useState } from "react";
import { Grid, Typography, Box, Pagination } from "@mui/material";
import { BaseTvShowProps } from "../../types/interfaces"; 
import TVShowList from "../tvList";

interface SimilarTvShowsProps {
  tvShows: BaseTvShowProps[];
  action: (tvShow: BaseTvShowProps) => React.ReactNode;
}

const SimilarTVShows: React.FC<SimilarTvShowsProps> = ({ tvShows, action }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  const tvShowsWithPoster = tvShows.filter((tvShow) => tvShow.poster_path);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTvShows = tvShowsWithPoster.slice(startIndex, startIndex + PAGE_SIZE);

  const totalPages = Math.ceil(tvShowsWithPoster.length / PAGE_SIZE);

  return (
    <Box sx={{ marginTop: "40px" }}>
      <Typography variant="h4" component="div" sx={{ textAlign: "center", color: "#fff", mb: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}>
        SIMILAR SHOWS
      </Typography>
      <Grid container spacing={5} sx={{ padding: "30px" }}>
        <TVShowList tvShows={paginatedTvShows} action={action} />
      </Grid>
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_event, value) => setCurrentPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white', 
              },
              '& .MuiPaginationItem-ellipsis': {
                color: 'white', 
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default SimilarTVShows;