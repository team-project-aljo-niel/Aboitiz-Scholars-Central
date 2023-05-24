import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useTheme,
  Badge,
  Popover,
  Typography,
  Button,
} from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, themeColors } from '../theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { NotificationAddOutlined } from '@mui/icons-material';
import PersonModeOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { CurrentUserContext } from './providers/CurrentUserProvider';
import { UpdatesContext } from './providers/UpdatesProvider';

// Topbar Component
const Topbar = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [updates] = useContext(UpdatesContext);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const pendingRequestCount = updates?.length;

  const handleLogout = () => {
    localStorage.removeItem('token-auth');
    setCurrentUser();
    navigate('/');
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
    if (pendingRequestCount > 0) {
      setNotificationMessage(
        `You have ${pendingRequestCount} Pending Requests`
      );
    } else {
      setNotificationMessage('No new notifications');
    }
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleRequestClick = () => {
    navigate('scholars/requests');
    handleNotificationClose();
  };

  if (!currentUser) {
    return <div>...Loading</div>;
  }

  return (
    <Box display='flex' justifyContent='end' p={2}>
      <Box display='flex'>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'light' ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        {currentUser.access === 'Admin' ? (
          <>
            <IconButton
              onClick={handleNotificationClick}
              aria-describedby='notification-popover'
            >
              <Badge badgeContent={pendingRequestCount} color='error'>
                <NotificationAddOutlined />
              </Badge>
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
            </IconButton>
            <Popover
              id='notification-popover'
              open={Boolean(notificationAnchorEl)}
              anchorEl={notificationAnchorEl}
              onClose={handleNotificationClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box p={2}>
                <Typography variant='h6'>{notificationMessage}</Typography>
                {notificationMessage.includes('Requests') && (
                  <Button onClick={handleRequestClick}>View Requests</Button>
                )}
              </Box>
            </Popover>
          </>
        ) : undefined}

        <IconButton onClick={() => navigate('/ASC/account')}>
          <PersonModeOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
