import React, { useState } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { MovieImage, MovieDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from '../spinner';
import CastMembers from './../castMembers';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MovieReviews from '../movieReviews';

const styles = {
    gridListTile: {
        width: 450,
        height: '100vh',
    },
    iframe: {
        width: "100%",
        height: "100%",
        border: "none",
    },
    tabs: {
        color: "white",
    },
    tab: {
        color: "white",
        "&.Mui-selected": {
            color: "white",
            borderBottom: "2px solid white",
        },
    },
};

interface TemplateMoviePageProps {
    movie: MovieDetailsProps;
    trailerKey: string | null;  
    children: React.ReactElement;
}

const TemplateMoviePage: React.FC<TemplateMoviePageProps> = ({ movie, trailerKey, children }) => {
    const [value, setValue] = useState(0);

    const { data, error, isLoading, isError } = useQuery<MovieImage[], Error>(
        ["images", movie.id],
        () => getMovieImages(movie.id)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const images = data as MovieImage[];
    const firstImage = images.length > 0 ? images[0] : null;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <MovieHeader {...movie} />
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    {firstImage && (
                        <ImageList>
                            <ImageListItem
                                key={firstImage.file_path}
                                sx={styles.gridListTile}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${firstImage.file_path}`}
                                    alt={'Image alternative'}
                                />
                            </ImageListItem>
                        </ImageList>
                    )}
                </Grid>
                <Grid item xs={8} mt={2} mb={2}>
                    {trailerKey ? (
                        <iframe
                            title="YouTube Trailer"
                            style={styles.iframe}
                            src={`https://www.youtube.com/embed/${trailerKey}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <p>Trailer not available</p>
                    )}
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    centered
                    sx={styles.tabs}
                >
                    <Tab label="Overview" sx={styles.tab} />
                    <Tab label="Cast" sx={styles.tab} />
                    <Tab label="Reviews" sx={styles.tab} />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    {value === 0 && (
                        <Box>
                            <h2>Overview</h2>
                            {children}
                        </Box>
                    )}
                    {value === 1 && (
                        <Box>
                            <h2>Cast</h2>
                            <CastMembers movieId={movie.id} />
                        </Box>
                    )}
                    {value === 2 && (
                        <Box>
                            <h2>Reviews</h2>
                            <MovieReviews {...movie}/>
                        </Box>
                    )}
                </Box>
            </Grid>
        </>
    );
};

export default TemplateMoviePage;
