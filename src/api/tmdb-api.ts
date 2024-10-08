export const getMovies = (page:number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};
  
export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};
  export const getTvSeriesDetails = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get TV series data. Response status: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

  export const getGenres = () => {
    return fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };
  
  export const getMovieImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };
  
  export const getUpcomingMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      // .then(json => json.results);
  };
  export const getPopularMovies = () => {
    return fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      // .then(json => json.results);
  };
  export const getTvSeries = () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
      .then(res => res.json())
      // .then(json => json.results);
  };
  
  export const getPeople = () => {
    return fetch(
      `https://api.themoviedb.org/3/trending/person/day?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then(res => res.json())
      // .then(json => json.results);
  };
  export const getPeopleImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/trending/person/day/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("failed to fetch images");
      }
      return response.json();
    }).then((json) => json.posters)
      .catch((error) => {
        throw error
      });
  };

  export const getMovieCast = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cast data");
        }
        return response.json();
      })
      .then((json) => {
        const cast = json.cast || [];
        return { cast }; // Return an object with the cast array
      })
      .catch((error) => {
        throw error;
      });
  };
  
  export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.results);
        return json.results;
  });
};

export const getTvShows = () => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch TV shows. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTvShow = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get TV show data. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTvShowCast = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch TV show cast data");
      }
      return response.json();
    })
    .then((json) => {
      const cast = json.cast || [];
      return { cast }; // Return an object with the cast array
    })
    .catch((error) => {
      throw error;
    });
};

  export const getActor = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch actor data");
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  export const getActorMovieCredits = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch actor movie credits");
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }
  export const getActorTvCredits = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch actor TV credits");
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getTvShowImages = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        return response.json();
      })
      .then((json) => {
        const posters = json.posters || [];
        const backdrops = json.backdrops || [];
        return { posters, backdrops };
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getTvShowVideos = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        return response.json();
      })
      .then((json) => {
        const results = json.results || [];
        return { results };
      })
      .catch((error) => {
        throw error;
      });
  };

  export const getSimilarTvShows = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });
  };
  
  export const getTvShowWatchProviders = (id: string | number) => {
    return fetch(
      `https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false`
    )
      .then((res) => res.json())
      .catch((error) => {
        throw error;
      });
  };

export const getSortedByPopularity = (sort_value: string, page: number)=>{
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.${sort_value}`
  )
  .then((res) => res.json())
  .catch((error) => {
    throw error;
  });
}

export const getMoviesByGenre = (genreId: number, page: number,sort_value: string)=>{
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&with_genres=${genreId}&page=${page}&sort_by=popularity.${sort_value}`
  )
  .then((res) => res.json())
  .catch((error) => {
    throw error;
  });
}

export const searchMoviesByTitle = (query: string, page: number, sort_value: string) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}&sort_by=popularity.${sort_value}`
  )
  .then((res) => res.json())
  .catch((error) => {
    throw error;
  });
};

export const getMovieTrailer = (movieId: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  )
  .then((res) => res.json())
  .then((data) => {
    const trailer = data.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
    return trailer ? trailer.key : null; 
  })
  .catch((error) => {
    throw error;
  });
};

