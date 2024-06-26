import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LoginPopup from './loginPopup.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '/TeamBar.png';
import axios from 'axios';
import { API_URL } from '../constants.js';
export default function Bar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isPopoverOpen = Boolean(popoverAnchorEl);

  const Notify = (message) => {
    toast(message, {
        position: "bottom-right",
        autoClose: 2000,
        progressClassName: 'custom-progress-bar',
        className: 'custom-toast',
        bodyClassName: 'custom-toast-body',
        style: {
            backgroundColor: '#FFFFFF',
            color: '#333333',
            border: '1px solid #CCCCCC',
        },
        progressStyle: {
            backgroundColor: '#0D47A1 !important',
        },
    });
};


  useEffect(() => {
    const getNotification = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/notificas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotifications(response.data.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername || '');
      Notify("Login Success");
      getNotification();
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLoginOpen = () => {
    setOpen(true);
  };

  const handleLoginClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUsername('');
    Notify("Logout Success");
    handleMenuClose();
    navigate("/");
  };

  const handleUserArea = () => {
    navigate("/userArea");
    handleMenuClose();
  };

  const handlePopoverOpen = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
    setNotifications([]);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn ? (
        [
          <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>,
          <MenuItem key="user-area" onClick={handleUserArea}>User Area</MenuItem>
        ]
      ) : (
        <MenuItem onClick={handleLoginOpen}>Login</MenuItem>
      )}
    </Menu>
  );

  const popoverId = 'notification-popover';
  const renderPopover = (
    <Popover
      id={popoverId}
      open={isPopoverOpen}
      anchorEl={popoverAnchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        style: {
          width: '300px',
          maxHeight: '400px',
        },
      }}
    >
      <Box p={2}>
        <Typography variant="h6">Notifications</Typography>
        <List>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem key={notification.id} sx={{ whiteSpace: 'normal' }}>
                <ListItemText primary={notification.attributes.Notifica} />
              </ListItem>
            ))
          ) : (
            <ListItem>No new notifications</ListItem>
          )}
        </List>
      </Box>
    </Popover>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handlePopoverOpen}>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={notifications.length} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        {isLoggedIn ? (
          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {username ? `Benvenuto, ${username}!` : 'Benvenuto!'}
              </Typography>
            </IconButton>
          </>
        ) : (
          <Button color="inherit" onClick={handleLoginOpen}>
            Login
          </Button>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            sx={{ height: 50 }}
            alt="Logo"
            src={logo}
            onClick={e => {
              navigate('/');
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show new notifications" color="inherit" onClick={handlePopoverOpen}>
              <Badge badgeContent={notifications.length} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {username ? `${username}` : 'Benvenuto!'}
                </Typography>
              </IconButton>
            ) : (
              <Button color="inherit" onClick={handleLoginOpen}>
                Login
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderPopover}
      <LoginPopup open={open} handleClose={handleLoginClose} />
      <ToastContainer />
    </Box>
  );
}
