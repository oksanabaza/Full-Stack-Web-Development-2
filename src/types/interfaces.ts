export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
  }

  export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    selectFavourite: (movieId: number) => void;  //add this
  }

export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
      id: number;
      name: string;
    }[];
    production_countries: {
      iso_3166_1: number;
      name: string;
    }[];
  }
  
export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
  }
  
export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
  }
  
export type FilterOption = "title" | "genre";

export interface BaseMovieListProps {
  movies: BaseMovieProps[];
  action: (m: BaseMovieProps) => React.ReactNode;
}

export interface ReviewAuthor{
  avatar_path: string,
  name:string,
  rating:number,
  username:string,
}
export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
  created_at:string,
  author_details:ReviewAuthor,

}
export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovieProps[];
}
export interface AuthContextInterface {
  token: string | null;
  authenticate: ((username: string, password: string) => void);
  signout: () => void;
  user: string;
  loading:boolean;
}
export interface MovieCastMember {
  id: number;
  name: string;
  profile_path?: string;
}
export interface ActorDetailsProps {
  id: number;
  name: string;
  biography: string;
  profile_path?: string;
  birthday?: string;
  deathday?: string;
  known_for_department: string;
  popularity: number;
  place_of_birth?: string;
  also_known_as?: string[];
}
export interface TvShowCastMember {
  id: number;
  name: string;
  profile_path?: string;
}
export interface BaseTvShowProps {
  name: string;
  id: number;
  original_language: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  backdrop_path?: string;
  genre_ids?: number[];
  favourite?: boolean;
  playlist?: boolean;
  cast?: TvShowCastMember[];
}
export interface BaseTvShowListProps {
  tvShows: BaseTvShowProps[];
  action?: (tvShow: BaseTvShowProps) => React.ReactNode;
}
export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
}

export interface TvShowDetailsProps extends BaseTvShowProps {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  number_of_seasons: number;
  number_of_episodes: number;
  tagline: string;
}
export interface TvImage {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}
export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
}
export interface TvShowRegionWatchProviders {
  link: string;
  flatrate?: WatchProvider[]; 
  rent?: WatchProvider[];
  buy?: WatchProvider[]; 
}

export interface TvShowWatchProvidersResponse {
  id: number;
  results: {
    IE?: TvShowRegionWatchProviders;
    GB?: TvShowRegionWatchProviders;
    [key: string]: TvShowRegionWatchProviders | undefined;
  };
}
export interface BasePersonProps {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface DiscoverPeopleProps {
  results: BasePersonProps[];
}