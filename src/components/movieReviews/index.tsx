import React, { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getMovieReviews } from "../../api/tmdb-api";
import { MovieDetailsProps, Review } from "../../types/interfaces";

const styles = {
    commentBox: {
        display: "flex",
        alignItems: "flex-start",
        marginBottom: "20px",
        padding: "15px",
        // backgroundColor: "#f9f9f9",
        borderRadius: "8px",
    },
    avatar: {
        marginRight: "15px",
    },
    commentContent: {
        flex: 1,
    },
    authorName: {
        fontWeight: "bold",
        marginBottom: "5px",
    },
    commentText: {
        marginBottom: "10px",
    },
    commentDate: {
        fontSize: "0.85rem",
        color: "#888",
    },
};

const MovieReviews: React.FC<MovieDetailsProps> = (movie) => { 
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        getMovieReviews(movie.id).then((reviews) => {
            setReviews(reviews);
        });
    }, [movie.id]);

    return (
        <TableContainer component={Paper} sx={{ padding: "20px" }}>
            {reviews.map((review) => (
                <Box key={review.author} sx={styles.commentBox}>
                    <Avatar
                        src={`https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`}
                        alt={review.author_details.name}
                        sx={styles.avatar}
                    />
                    <Box sx={styles.commentContent}>
                        <Typography sx={styles.authorName}>
                            {review.author_details.name || review.author}
                        </Typography>
                        <Typography sx={styles.commentText}>
                            {review.content}
                        </Typography>
                        <Typography sx={styles.commentDate}>
                            {new Date(review.created_at).toLocaleDateString()}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </TableContainer>
    );
};

export default MovieReviews;
