import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviePage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import PopularMoviesPage from "./pages/PopularMoviesPage";
import TVSeriesPage from "./pages/TVSeriesPage"
import ActorsPage from './pages/ActorsPage'
import LoginPage from './pages/loginPage';
import ProtectedRoute from './components/protectedRoute';
import AuthProvider from "./contexts/authContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <AuthProvider>
      <SiteHeader />
      <MoviesContextProvider>
      <Routes>
      <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
      <Route path="/reviews/:id" element={<MovieReviewPage/>} />
      <Route path="movies/upcoming" element={<UpcomingMoviePage />} />
        {/* <Route path="/movies/favourites" element={<FavouriteMoviesPage />} /> */}
        <Route path="/movies/favourites" element={
              <ProtectedRoute>
                <FavouriteMoviesPage />
              </ProtectedRoute>
            } />
        <Route path="/movies/popular" element={<PopularMoviesPage />} />
        <Route path="/movies/tvseries" element={<TVSeriesPage />} />
        <Route path="/movies/people" element={<ActorsPage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
      </MoviesContextProvider>
      </AuthProvider>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
