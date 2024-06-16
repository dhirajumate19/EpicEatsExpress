import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  SearchRounded,
  FavoriteBorder,
  ShoppingCartOutlined,
  Menu as MenuIcon,
} from "@mui/icons-material";
import logo from "../assets/Logo.png"; // Adjust the path as necessary
import { NavLink } from "react-router-dom";
import UserButton from "../comman/button";
import { useDispatch } from "react-redux";
import { logout } from "../StateManagement/reducer/userSlice";
import { AuthContext } from "../StateManagement/context/AuthContext";

const StyledAppBar = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`;

const TextButton = styled.span`
border-radius: 7px;
color: black;
font-size: 14px;
cursor: pointer;
margin-top: 15px;
transition: all 0.3s ease;
display: flex;
align-items: center;
justify-content: center;
gap: 6px;
height: min-content;
padding: 12px 26px;
box-shadow: 1px 20px 35px 0px ${({ theme }) => theme.primary + "40"};
border: 1px solid ${({ theme }) => theme.primary};
@media (max-width: 600px) {
  padding: 8px 12px;
`;

const Navbar = ({ currentUser }) => {
  const pages = ["Home", "Dishes", "Order", "Contact"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const { setOpenAuth } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <StyledAppBar>
      <Container maxWidth="xl">
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              EpicEatsExpress
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                color: "black",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                {currentUser ? (
                  <TextButton
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </TextButton>
                ) : (
                  <div style={{ display: "flex", gap: "12px" }}>
                    <UserButton
                      text="Sign Up"
                      small
                      outlined
                      onClick={() => setOpenAuth(true)}
                    />
                    <UserButton
                      text="Sign In"
                      small
                      outlined
                      onClick={() => setOpenAuth(true)}
                    />
                  </div>
                )}
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "orange",
              textDecoration: "none",
            }}
          >
            EpicEatsExpress
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
            {currentUser ? (
              <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <UserButton
                  text="Sign Up"
                  outlined
                  small
                  onClick={() => setOpenAuth(true)}
                />
                <UserButton
                  text="Sign In"
                  small
                  onClick={() => setOpenAuth(true)}
                />
              </div>
            )}
          </Box>

          <Box sx={{ display: "flex", marginRight: "5px" }}>
            <IconButton component={NavLink} to="/search" color="inherit">
              <SearchRounded />
            </IconButton>
            <IconButton component={NavLink} to="/favorites" color="inherit">
              <FavoriteBorder />
            </IconButton>
            <IconButton component={NavLink} to="/cart" color="inherit">
              <ShoppingCartOutlined />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src={logo} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;
