import React from "react"; 
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
import { DiscoverMovies } from '../types/interfaces';
import { getPeople  } from "../api/tmdb-api";

const TVSeriesPage: React.FC= () => {
//   const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
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
    return <h1>{(error as Error).message}</h1>;
  }
  const movies = data ? data.results : [];
  return (
    <>
      {movies ? (
        <>
      this is a popular TvSeries
      <div>{movies.map((i)=>{
        return <div><div>{i.id}</div><div>{i.name}</div></div>

      })}</div>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default TVSeriesPage;