// @ts-nocheck
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviePage from "./pages/upcomingMoviesPage";
import TvShowsPage from "./pages/tvShowsPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import PopularMoviesPage from "./pages/PopularMoviesPage";
import TVSeriesPage from "./pages/TVSeriesPage";
import ActorsPage from "./pages/ActorsPage";
import LoginPage from "./pages/loginPage";
import ProtectedRoute from "./components/protectedRoute";
import AuthProvider from "./contexts/authContext";
import { ThemeProvider, CssBaseline, Container, useMediaQuery, Theme } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import "./styles.css";
import AllActorsPage from './components/AllActorsPage'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');

  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <SiteHeader theme={currentTheme} toggleTheme={toggleTheme} />
            <MoviesContextProvider>
              <Container maxWidth="xl">
                <Routes>
                  <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                  <Route path="/reviews/:id" element={<MovieReviewPage />} />
                  <Route path="movies/upcoming" element={<UpcomingMoviePage />} />
                  <Route path="/movies/favourites" element={
                    <ProtectedRoute>
                      <FavouriteMoviesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/movies/popular" element={<PopularMoviesPage />} />
                  <Route path="/movies/tvseries" element={<TVSeriesPage />} />
                  <Route path="/movies/people" element={<AllActorsPage />} />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route path="/actors/:id" element={<ActorsPage />} />
                  <Route path="/tvshows/:id" element={<TvShowsPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Container>
            </MoviesContextProvider>
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
