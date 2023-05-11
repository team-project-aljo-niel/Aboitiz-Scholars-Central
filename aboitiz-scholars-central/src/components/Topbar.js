import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, themeColors } from '../theme';
import { InputBase } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonModeOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router';
import { CurrentUserContext } from './providers/CurrentUserProvider';

// Topbar Component
const Topbar = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token-auth');
    setCurrentUser();
    navigate('/');
  };

  if (!currentUser) {
    return <div>...Loading</div>;
  }

  return (
    <Box display="flex" justifyContent="end" p={2}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'light' ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
        {currentUser.access === 'Admin' ? (
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
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
