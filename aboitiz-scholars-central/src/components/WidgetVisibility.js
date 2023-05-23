import { Box, Switch, Typography, useTheme } from "@mui/material";
import React from "react";
import { themeColors } from "../theme";
import { updateWidgetsVisibility } from "./services/UserService";
import { useEffect } from "react";
import { useState } from "react";

const WidgetVisibility = ({
  label,
  title,
  icon,
  value,
  visibility,
  setVisibility,
}) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [updatedVisibility, setUpdatedVisibility] = useState();

  useEffect(() => {
    const updateVisibility = async () => {
      try {
        let widgetsVisibility = {
          bu: updatedVisibility.bu,
          city: updatedVisibility.city,
          province: updatedVisibility.province,
          island: updatedVisibility.island,
          fromDate: updatedVisibility.fromDate,
          toDate: updatedVisibility.toDate,
          totalScholars: updatedVisibility.totalScholars,
          activeScholars: updatedVisibility.activeScholars,
          graduatedScholars: updatedVisibility.graduatedScholars,
          terminatedScholars: updatedVisibility.terminatedScholars,
          latinHonorScholars: updatedVisibility.latinHonorScholars,
          employedGraduates: updatedVisibility.employedGraduates,
          aboitizGraduates: updatedVisibility.aboitizGraduates,
          scholarsBar: updatedVisibility.scholarsBar,
          agePie: updatedVisibility.agePie,
          genderPie: updatedVisibility.genderPie,
          terminatedPie: updatedVisibility.terminatedPie,
          scholarsGeo: updatedVisibility.scholarsGeo,
        };
        await updateWidgetsVisibility(widgetsVisibility);
      } catch (error) {}
    };
    updateVisibility();
  }, [updatedVisibility]);

  const handleChange = async (e) => {
    setUpdatedVisibility({ ...visibility, [e.target.name]: e.target.checked });
    setVisibility({ ...visibility, [e.target.name]: e.target.checked });
  };

  console.log(visibility);

  return (
    <Box width="100%" m="0 20px">
      <Box display="flex" alignItems="center">
        <Switch
          checked={value}
          onChange={handleChange}
          label=""
          color="secondary"
          name={label}
        />
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          ml="20px"
        >
          <Typography variant="h4" sx={{ color: colors.black[500], ml: "5px" }}>
            {title}
          </Typography>
          {icon}
        </Box>
      </Box>
    </Box>
  );
};

export default WidgetVisibility;
