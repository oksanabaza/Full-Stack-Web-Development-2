import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getTvShowImages, getTvShowVideos, getSimilarTvShows, getTvShowWatchProviders } from "../../api/tmdb-api";
import { TvImage, TvShowDetailsProps, BaseTvShowProps, TvShowWatchProvidersResponse } from "../../types/interfaces";
import TvShowCastMembers from "../tvCastMembers";
import Spinner from "../spinner";
import Box from "@mui/material/Box";
import AddToTvFavouritesIcon from "../cardIcons/addToFavourites";
import SimilarTvShows from "../similarTvShows";

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    position: "relative",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "20px",
    position: "relative",
    zIndex: 2,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
    paddingBottom: "20px",
    paddingTop: "20px",
    maxWidth: "80%",
    textAlign: "center",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  trailerContainer: {
    width: "80%",
    maxWidth: "80%",
    aspectRatio: "16/9",
    marginBottom: "50px",
    border: "none",
  },
  similarTvShowsContainer: {
    width: "100%",
  },
  watchProvidersContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  providerLogo: {
    width: "60px",
    margin: "5px",
  },
  justWatchLogo: {
    width: "140px",
    marginTop: "5px",
  },
};

interface TemplateTvShowPageProps {
  tvShow: TvShowDetailsProps;
  children: React.ReactElement;
}

const TemplateTvShowPage: React.FC<TemplateTvShowPageProps> = ({ tvShow, children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {  error: imagesError, isLoading: imagesLoading, isError: isImagesError } = useQuery<
    { posters: TvImage[]; backdrops: TvImage[] },
    Error
  >(["images", tvShow.id], () => getTvShowImages(tvShow.id));

  const { data: videosData, error: videosError, isLoading: videosLoading, isError: isVideosError } = useQuery<
    { results: { key: string; site: string; type: string }[] },
    Error
  >(["videos", tvShow.id], () => getTvShowVideos(tvShow.id));

  const { data: similarTvShowsData, error: similarTvShowsError, isLoading: similarTvShowsLoading, isError: isSimilarTvShowsError } = useQuery<
    { results: BaseTvShowProps[] },
    Error
  >(["similarTvShows", tvShow.id], () => getSimilarTvShows(tvShow.id));

  const { data: watchProvidersData, error: watchProvidersError, isLoading: watchProvidersLoading, isError: isWatchProvidersError } = useQuery<
    TvShowWatchProvidersResponse,
    Error
  >(["watchProviders", tvShow.id], () => getTvShowWatchProviders(tvShow.id));

  if (imagesLoading || videosLoading || similarTvShowsLoading || watchProvidersLoading) {
    return <Spinner />;
  }

  if (isImagesError) {
    return <h1>{imagesError.message}</h1>;
  }

  if (isVideosError) {
    return <h1>{videosError.message}</h1>;
  }

  if (isSimilarTvShowsError) {
    return <h1>{similarTvShowsError.message}</h1>;
  }

  if (isWatchProvidersError) {
    return <h1>{watchProvidersError.message}</h1>;
  }

  const similarTvShows = similarTvShowsData?.results || [];

  const irelandProviders = watchProvidersData?.results?.IE?.flatrate || [];

  // const { backdrops } = imagesData as {
  //   posters: TvImage[];
  //   backdrops: TvImage[];
  // };

  const trailer = videosData?.results.find((video) => video.type === "Trailer" && video.site === "YouTube");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const backdropUrl =
  //   backdrops.length > 0
  //     ? `url(https://image.tmdb.org/t/p/original/${backdrops[0].file_path})`
  //     : "url(https://via.placeholder.com/1920x1080?text=Backdrop+Not+Available)";

  const contentContainerStyle = {
    ...styles.contentContainer,
    // backgroundImage: backdropUrl,
  };


  const generateJustWatchUrl = (title: string) => {
    const formattedTitle = title
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");  
    
    return `https://www.justwatch.com/ie/tv-series/${formattedTitle}`;
  };

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={contentContainerStyle}>
        {trailer && (
          <Box sx={styles.trailerContainer}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ border: "none" }}
            />
          </Box>
        )}
        <Box sx={styles.detailsContainer}>
          {children}
          {irelandProviders.length > 0 && (
            <Box sx={styles.watchProvidersContainer}>
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                {irelandProviders.map((provider) => (
                  <Box key={provider.provider_id} display="flex" justifyContent="center" alignItems="center" my={1} mx={1}>
                    {/* <img src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} alt={provider.provider_name} style={styles.providerLogo} /> */}
                  </Box>
                ))}
              </Box>
              <a href={generateJustWatchUrl(tvShow.name)} target="_blank">
              <img src="/images/justwatch-logo.png" alt="JustWatch" style={styles.justWatchLogo} />

              </a>
            </Box>
          )}
        </Box>
        <TvShowCastMembers tvShowId={tvShow.id} />
      </Box>
      <Box sx={styles.similarTvShowsContainer}>
        {similarTvShows.length > 0 && (
          <SimilarTvShows
            tvShows={similarTvShows}
            action={(tvShow: BaseTvShowProps) => <AddToTvFavouritesIcon title={""} budget={0} homepage={undefined} imdb_id={""} release_date={""} tagline={""} runtime={0} revenue={0} vote_count={0} {...tvShow} />}
          />
        )}
      </Box>
    </Box>
  );
};

export default TemplateTvShowPage;