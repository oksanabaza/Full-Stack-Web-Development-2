// @ts-nocheck
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Box, Grid, Typography, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";
import { getPeople } from "../../api/tmdb-api";
import { DiscoverPeopleProps } from "../../types/interfaces";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Image";

const ActorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 8;

  const { data, error, isLoading, isError } = useQuery<DiscoverPeopleProps, Error>(
    'people',
    getPeople,
    {
      staleTime: 1000 * 60 * 5, // 5 min
      cacheTime: 1000 * 60 * 60, // 60 min
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  const people = data ? data.results : [];

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPeople = filteredPeople.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(filteredPeople.length / PAGE_SIZE);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#fff' }}>
        Trending Actors
      </Typography>
      <Grid container spacing={3}>
        {paginatedPeople.map(person => (
          <Grid item key={person.id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/actors/${person.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  '&:hover .name': {
                    opacity: 1,
                  },
                }}
              >
                <img
                  src={person.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                    : PLACEHOLDER_IMAGE}
                  alt={person.name}
                  style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                />
                <Typography
                  variant="h6"
                  className="name"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: 1,
                    opacity: 0, 
                    transition: 'opacity 0.3s ease', 
                  }}
                >
                  {person.name}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
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

export default ActorsPage;
