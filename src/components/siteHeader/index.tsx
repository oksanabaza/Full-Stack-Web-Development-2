import React, { MouseEvent,useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from '../../contexts/authContext';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container, Theme } from "@mui/material";
import ThemeToggle from '../../themeToggle';
import LogoutButton from '../LogoutButton'

const styles = {
  title: {
    flexGrow: 1,
  },
};

interface HeaderProps {
  theme: Theme; 
  toggleTheme: () => void;
}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const { token } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg")); // Use theme from props

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Upcoming", path: "movies/upcoming" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Popular", path: "/movies/popular" },
    { label: "TV Series", path: "/movies/tvseries" },
    { label: "Actors", path: "/movies/people" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary" >
        <Container maxWidth="xl" >
          <Toolbar>
            <Typography variant="h4" sx={styles.title}>
              TMDB Client
            </Typography>
            {/* <Typography variant="h6" sx={styles.title}>
              All you ever wanted to know about Movies!
            </Typography> */}
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                  size="large"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
            <ThemeToggle theme={theme.palette.mode} toggleTheme={toggleTheme} />
            {token ? (
        <LogoutButton />
      ) : (
        <Button variant="contained" color="primary" component={Link} to="/login">
          Login
        </Button>
      )}
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
