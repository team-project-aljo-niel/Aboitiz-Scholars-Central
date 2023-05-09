import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { themeColors } from "../theme";
import DataPercentage from "./DataPercentage";

const DataBox = ({ title, subtitle, icon, progress, percentage }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  return (
    <Box width="100%" m="0 20px">
      <Box mb="5px" display="flex" justifyContent="space-between">
        <Box display="flex">
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.black[500], ml: "5px" }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <DataPercentage progress={progress} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: colors.redAccent[400], ml: "5px" }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: colors.redAccent[600] }}
        >
          {percentage}
        </Typography>
      </Box>
    </Box>
  );
};

export default DataBox;
