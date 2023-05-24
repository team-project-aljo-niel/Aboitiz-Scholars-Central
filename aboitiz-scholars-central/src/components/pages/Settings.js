import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import Header from "../Header";
import { themeColors } from "../../theme";
import WidgetVisibility from "../WidgetVisibility";
import { useContext } from "react";
import { VisibilityContext } from "../providers/VisibilityProvider";
import {
  BarChart,
  Business,
  DonutSmall,
  LocationOn,
  Person,
  PersonAdd,
  PersonOff,
  School,
  Work,
  WorkspacePremium,
} from "@mui/icons-material";

const Settings = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [visibility, setVisibility] = useContext(VisibilityContext);

  if (!visibility) {
    return null;
  }

  return (
    <Box m="20px">
      <Header title="Settings" subtitle="Toggle widgets visibility" />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            color={colors.black[500]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Filters
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="bu"
              title="Business Unit"
              value={visibility.bu}
              visibility={visibility}
              setVisibility={setVisibility}
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="city"
              title="City"
              value={visibility.city}
              visibility={visibility}
              setVisibility={setVisibility}
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="province"
              title="Province"
              value={visibility.province}
              visibility={visibility}
              setVisibility={setVisibility}
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="island"
              title="Island Group"
              value={visibility.island}
              visibility={visibility}
              setVisibility={setVisibility}
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="fromDate"
              title="Date From"
              value={visibility.fromDate}
              visibility={visibility}
              setVisibility={setVisibility}
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="toDate"
              title="Date to"
              value={visibility.toDate}
              visibility={visibility}
              setVisibility={setVisibility}
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            color={colors.black[500]}
            fontWeight="bold"
            sx={{ mb: "5px" }}
          >
            Widgets
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="totalScholars"
              title="Total Scholars"
              value={visibility.totalScholars}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <School
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="activeScholars"
              title="Active Scholars"
              value={visibility.activeScholars}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <Person
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="graduatedScholars"
              title="Graduated Scholars"
              value={visibility.graduatedScholars}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <PersonAdd
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="terminatedScholars"
              title="Terminated Scholars"
              value={visibility.terminatedScholars}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <PersonOff
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="latinHonorScholars"
              title="Graduated w/ Latin Honors"
              value={visibility.latinHonorScholars}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <WorkspacePremium
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="employedGraduates"
              title="Employed Graduates"
              value={visibility.employedGraduates}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <Work sx={{ color: colors.redAccent[500], fontSize: "26px" }} />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="aboitizGraduates"
              title="Employed in Aboitiz Graduates"
              value={visibility.aboitizGraduates}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <Business
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="scholarsBar"
              title="Scholars Bar Chart"
              value={visibility.scholarsBar}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <BarChart
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="agePie"
              title="Age Pie Chart"
              value={visibility.agePie}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <DonutSmall
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="genderPie"
              title="Gender Pie Chart"
              value={visibility.genderPie}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <DonutSmall
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="terminatedPie"
              title="Terminated Pie Chart"
              value={visibility.terminatedPie}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <DonutSmall
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="70px"
            borderRadius="5px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px;"
          >
            <WidgetVisibility
              label="scholarsGeo"
              title="Scholars Choropleth Map"
              value={visibility.scholarsGeo}
              visibility={visibility}
              setVisibility={setVisibility}
              icon={
                <LocationOn
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />{" "}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
