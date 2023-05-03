import { Typography, Box, useTheme } from "@mui/material";
import { themeColors } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.black[500]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.redAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
