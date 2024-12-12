import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Fab,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Logout as LogoutIcon,
  EditNote as EditNoteIcon,
  Notes as NotesIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <EditNoteIcon sx={{ fontSize: "36px" }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NOTES-APP
        </Typography>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <AccountCircleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.username}
          </Typography>
          <MoreVertIcon sx={{ ml: 2 }} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <Link to="/">
            <MenuItem>
              <NotesIcon sx={{ mr: 1 }} /> Mis Notas
            </MenuItem>
          </Link>
          <Link to="/createNote">
            <MenuItem>
              <AddIcon sx={{ mr: 1 }} /> Crear Notas
            </MenuItem>
          </Link>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 1 }} /> Cerrar Sesión
          </MenuItem>
        </Menu>
        <Link to="/createNote">
          <Fab
            color="primary"
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
            }}
          >
            <AddIcon />
          </Fab>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
