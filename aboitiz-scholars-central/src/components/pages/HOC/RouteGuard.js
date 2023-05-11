import { CurrentUserContext } from "../../providers/CurrentUserProvider";
import { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { themeColors } from "../../../theme";
import LockIcon from "@mui/icons-material/Lock";

// Route guard for admin and officer users
const RouteGuard = ({ children }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [currentUser] = useContext(CurrentUserContext);
  if (!currentUser) {
    return <div>...Loading</div>;
  }

  return (
    <>
      {currentUser.access !== "Scholar" ? (
        children
      ) : (
        <>
          <Box
            height="80%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              variant="h1"
              color={colors.black[500]}
              fontWeight="bold"
              sx={{ mb: "5px" }}
            >
              Unathorized Access
            </Typography>
            <Typography variant="h3" color={colors.redAccent[400]}>
              Please contact admins for access rights
            </Typography>
            <LockIcon sx={{ height: "250px", width: "250px" }} />
          </Box>
        </>
      )}
    </>
  );
};

export default RouteGuard;
