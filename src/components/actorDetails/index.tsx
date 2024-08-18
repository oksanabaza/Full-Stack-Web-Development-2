import React from "react";
import { Card, CardContent, CardMedia, Typography, Grid, useTheme } from "@mui/material";
import { ActorDetailsProps } from "../../types/interfaces";

const ActorDetails: React.FC<{ actor: ActorDetailsProps }> = ({ actor }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={4} sx={{ mt: 4, mb: 6 }}>
      {/* Actor Name */}
      <Grid item xs={12}>
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
          {actor.name}
        </Typography>
      </Grid>

      {/* Main Content Row */}
      <Grid item xs={12}>
        <Grid container spacing={4}>
          {/* Actor Profile Picture */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 5, overflow: "hidden", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)" }}>
              <CardMedia
                sx={{ height: 0, paddingTop: "150%" }}
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : 'path/to/default-image.jpg'
                }
                title={actor.name}
              />
            </Card>
          </Grid>

          {/* Biography and Additional Information */}
          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              {/* Biography */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 5, overflow: "hidden", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", backgroundColor: theme.palette.background.paper }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                      Biography
                    </Typography>
                    <Typography variant="body2">
                      {actor.biography || 'Biography information is not available.'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Additional Information */}
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 5, overflow: "hidden", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", backgroundColor: theme.palette.background.paper }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" component="div" sx={{ mb: 2 }}>
                      Additional Information
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Known For:</strong> {actor.known_for_department || 'Not Available'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Date of Birth:</strong> {actor.birthday || 'Not Available'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Place of Birth:</strong> {actor.place_of_birth || 'Not Available'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Popularity:</strong> {actor.popularity ? actor.popularity.toFixed(1) : 'Not Available'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActorDetails;
