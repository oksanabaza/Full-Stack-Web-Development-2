import React from "react";
import Typography from "@mui/material/Typography";
import { MovieDetailsProps } from "../../types/interfaces";

// const styles = {
//     chipSet: {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexWrap: "wrap",
//         listStyle: "none",
//         padding: 1.5,
//         margin: 0,
//     },
//     chipLabel: {
//         margin: 0.5,
//     },
//     fab: {
//         position: "fixed",
//         top: 50,
//         right: 2,
//     },
// };

const MovieDetails: React.FC<MovieDetailsProps> = (movie) => {

    // const [drawerOpen, setDrawerOpen] = useState(false); // New

    return (
        <>
            {/* <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count}`}
                />
                <Chip label={`Released: ${movie.release_date}`} />
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews {...movie} />
            </Drawer> */}
           <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

        </>
    );
};
export default MovieDetails;