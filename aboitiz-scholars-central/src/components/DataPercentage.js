import { useTheme } from "@emotion/react";
import React from "react";
import { themeColors } from "../theme";
import { Box } from "@mui/material";

const DataPercentage = ({ progress = "100", size = "30" }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const angle = progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[900]} 55%, transparent 56%),
    conic-gradient(transparent 0deg ${angle}deg, ${colors.grey[500]} ${angle}deg 360deg),
    ${colors.redAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></Box>
  );
};

export default DataPercentage;
