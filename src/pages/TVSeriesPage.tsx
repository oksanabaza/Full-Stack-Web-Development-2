import React from "react";
import { useQuery } from "react-query";
import { Box, Grid, Typography, Card, CardMedia, CardContent, CircularProgress } from "@mui/material";
import { DiscoverMovies, BaseTvShowProps } from '../types/interfaces';
import { getTvSeries } from "../api/tmdb-api";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=No+Image";

const TVSeriesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    'series',
    getTvSeries,
    {
      staleTime: 1000 * 60 * 5, // 5 min
      cacheTime: 1000 * 60 * 60, // 60 min
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          {(error as Error).message}
        </Typography>
      </Box>
    );
  }

  const series: BaseTvShowProps[] = data ? data.results : [];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, color: '#fff' }}>
        Popular TV Series
      </Typography>

      <Grid container spacing={4}>
        {series.map((tvSeries: BaseTvShowProps) => (
          <Grid item key={tvSeries.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              position: 'relative',
              '&:hover .description': {
                opacity: 0,
              },
              '&:hover .title': {
                opacity: 1,
              },
            }}>
              <CardMedia
                component="img"
                height="300"
                image={tvSeries.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${tvSeries.poster_path}`
                  : PLACEHOLDER_IMAGE}
                alt={tvSeries.name}
              />
              <CardContent sx={{
                backgroundColor: '#333',
                color: '#fff',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                transition: 'opacity 0.3s ease',
                '& .title': {
                  opacity: 0,
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  textAlign: 'center',
                  padding: 1,
                },
                '& .description': {
                  opacity: 1,
                  transition: 'opacity 0.3s ease',
                },
              }}>
                <Typography variant="h6" component="div" className="title">
                  {tvSeries.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TVSeriesPage;
