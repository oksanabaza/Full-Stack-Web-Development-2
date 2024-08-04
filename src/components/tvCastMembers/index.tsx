import React from "react";
import { useQuery } from "react-query";
import { getTvShowCast } from "../../api/tmdb-api";
import { TvShowCastMember } from "../../types/interfaces";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const styles = {
  castContainer: {
    maxWidth: "84%",
    overflowX: "auto",
    whiteSpace: "nowrap" as const,
    padding: "20px",
  },
  castCard: {
    display: "inline-block",
    margin: "0 10px",
    textAlign: "center" as const,
    cursor: "pointer", 
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0)", 
    transition: "transform 0.3s, box-shadow 0.3s",
    '&:hover': {
      transform: "scale(1.05)",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0)",
    },
  },
  castImage: {
    width: "150px",
    height: "225px",
    objectFit: "cover" as React.CSSProperties['objectFit'],
    borderRadius: "8px",
  },
  castName: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "1.2rem",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", 
    color: "#fff", 
  },
};


interface TvCastMembersProps {
  tvShowId: number; 
}

const TvCastMembers: React.FC<TvCastMembersProps> = ({ tvShowId }) => {

  const { data: castData, error: castError, isLoading: castLoading, isError: isCastError } = useQuery<
    { cast: TvShowCastMember[] },
    Error
  >(["tvShowCast", tvShowId], () => getTvShowCast(tvShowId));


  if (castLoading) {
    return <div>Loading cast members...</div>;
  }


  if (isCastError) {
    return <div>Error loading cast members: {castError?.message}</div>;
  }

  const castMembers = castData?.cast ?? [];

  const filteredCastMembers = castMembers.filter((castMember) => castMember.profile_path);

  return (
    <Box sx={styles.castContainer}>
      {filteredCastMembers.map((castMember) => (
        <Link
          key={castMember.id}
          to={`/actors/${castMember.id}`}
          style={{ textDecoration: 'none' }} 
        >
          <Box sx={styles.castCard}>
            <img
              src={`https://image.tmdb.org/t/p/w200${castMember.profile_path}`}
              alt={castMember.name}
              style={styles.castImage}
            />
            <Typography variant="h6" sx={styles.castName}>
              {castMember.name}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default TvCastMembers;