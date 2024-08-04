import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Pagination } from "@mui/material";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showCredits, setShowCredits] = useState<"movies" | "tv">("movies");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  const { data: actor, error, isLoading, isError } = useQuery<ActorDetailsProps, Error>(
    ["actor", id],
    () => getActor(id || "")
  );

  const { data: movieCredits, isLoading: isMoviesLoading, isError: isMoviesError } = useQuery<{ cast: BaseMovieProps[] }, Error>(
    ["actorMovies", id],
    () => getActorMovieCredits(id || "")
  );


  const { data: tvCredits, isLoading: isTvLoading, isError: isTvError } = useQuery<{ cast: BaseTvShowProps[] }, Error>(
    ["actorTv", id],
    () => getActorTvCredits(id || "")
  );


  if (isLoading || isMoviesLoading || isTvLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isMoviesError) {
    return <h1>Error loading movies</h1>;
  }

  if (isTvError) {
    return <h1>Error loading TV shows</h1>;
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
            <Typography variant="h4" component="h2" sx={{ mb: 4, ml: 2, color: '#fff' }}>
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
              <ToggleButton value="movies" aria-label="movies" sx={{ color: "white" }}>
                Movie Credits
              </ToggleButton>
              <ToggleButton value="tv" aria-label="tv shows" sx={{ color: "black" }}>
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
                    color: 'white', // Change page numbers to white
                  },
                  '& .MuiPaginationItem-ellipsis': {
                    color: 'white', // Change ellipsis to white
                  },
                }}
              />
            </Box>
          )}
        </>
      ) : (
        <p>Waiting for actor details</p>
      )}
    </>
  );
};

export default ActorDetailsPage;