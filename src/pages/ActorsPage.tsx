import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Pagination, useTheme } from "@mui/material";
import ActorDetails from "../components/actorDetails";
import ActorCredits from "../components/actorCredits";
import ActorTvCredits from "../components/actorTVCredits";
import Spinner from "../components/spinner";
import { getActor, getActorMovieCredits, getActorTvCredits } from "../api/tmdb-api";
import { ActorDetailsProps, BaseMovieProps, BaseTvShowProps } from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddToTvFavouritesIcon from "../components/cardIcons/addToFavourites";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams();
  const theme = useTheme(); 
  
  if (!id) {
    return <Typography variant="h6">No actor ID provided</Typography>;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showCredits, setShowCredits] = useState<"movies" | "tv">("movies");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  const { data: actor, error: actorError, isLoading: isActorLoading, isError: isActorError } = useQuery<ActorDetailsProps, Error>(
    ["actor", id],
    () => getActor(id)
  );

  const { data: movieCredits, error: movieError, isLoading: isMoviesLoading, isError: isMoviesError } = useQuery<{ cast: BaseMovieProps[] }, Error>(
    ["actorMovies", id],
    () => getActorMovieCredits(id)
  );

  const { data: tvCredits, error: tvError, isLoading: isTvLoading, isError: isTvError } = useQuery<{ cast: BaseTvShowProps[] }, Error>(
    ["actorTv", id],
    () => getActorTvCredits(id)
  );

  if (isActorLoading || isMoviesLoading || isTvLoading) {
    return <Spinner />;
  }

  if (isActorError) {
    return <Typography variant="h6" color="error">{actorError.message}</Typography>;
  }

  if (isMoviesError) {
    return <Typography variant="h6" color="error">Error loading movies: {movieError.message}</Typography>;
  }

  if (isTvError) {
    return <Typography variant="h6" color="error">Error loading TV shows: {tvError.message}</Typography>;
  }

  const handleToggleChange = (_event: React.MouseEvent<HTMLElement>, newValue: "movies" | "tv" | null) => {
    if (newValue !== null) {
      setShowCredits(newValue);
      setCurrentPage(1);
    }
  };

  const currentCredits = showCredits === "movies" ? movieCredits?.cast || [] : tvCredits?.cast || [];
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedCredits = currentCredits.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(currentCredits.length / PAGE_SIZE);

  return (
    <>
      {actor ? (
        <>
          <ActorDetails actor={actor} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, ml: 2, color: theme.palette.text.primary }}>
              CREDITS
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <ToggleButtonGroup
              value={showCredits}
              exclusive
              onChange={handleToggleChange}
              aria-label="credits selection"
            >
              <ToggleButton
                value="movies"
                aria-label="movies"
                sx={{
                  color: showCredits === "movies" ? theme.palette.primary.main : theme.palette.text.primary,
                  borderColor: theme.palette.primary.main,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.default,
                  },
                }}
              >
                Movie Credits
              </ToggleButton>
              <ToggleButton
                value="tv"
                aria-label="tv shows"
                sx={{
                  color: showCredits === "tv" ? theme.palette.primary.main : theme.palette.text.primary,
                  borderColor: theme.palette.primary.main,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.default,
                  },
                }}
              >
                TV Credits
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {showCredits === "movies" ? (
            <ActorCredits
              movies={paginatedCredits as BaseMovieProps[]}
              action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
            />
          ) : (
            <ActorTvCredits
              tvShows={paginatedCredits as BaseTvShowProps[]}
              action={(tvShow: BaseTvShowProps) => <AddToTvFavouritesIcon {...tvShow} />}
            />
          )}

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_event, value) => setCurrentPage(value)}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: theme.palette.text.primary, 
                  },
                  '& .MuiPaginationItem-ellipsis': {
                    color: theme.palette.text.primary, 
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <Typography variant="h6">Waiting for actor details</Typography>
      )}
    </>
  );
};

export default ActorDetailsPage;
