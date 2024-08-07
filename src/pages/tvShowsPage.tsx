import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TvShowDetails from "../components/tvDetails"; 
import TemplateTvShowPage from "../components/templateTvShowPage"; 
import { getTvShow } from '../api/tmdb-api'; 
import { useQuery } from "react-query";
import Spinner from '../components/spinner'; 
import { TvShowDetailsProps } from "../types/interfaces"; 

const TvDetailsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { id } = useParams();
  const { data: tvShow, error, isLoading, isError } = useQuery<TvShowDetailsProps, Error>(
    ["tvShow", id],
    () => getTvShow(id || "")
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tvShow ? (
        <TemplateTvShowPage tvShow={tvShow}>
          <TvShowDetails {...tvShow} />
        </TemplateTvShowPage>
      ) : (
        <p>Waiting for TV show details</p>
      )}
    </>
  );
};

export default TvDetailsPage;