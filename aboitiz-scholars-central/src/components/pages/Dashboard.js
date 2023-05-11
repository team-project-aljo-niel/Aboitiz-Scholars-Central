import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../Header";
import { useCallback, useContext } from "react";
import { ScholarContext } from "../providers/ScholarProvider";
import { useState } from "react";
import Filter from "../Filter";
import { TriggerContext } from "../providers/TriggerProvider";
import DateFilter from "../DateFilter";
import { useEffect } from "react";
import { themeColors } from "../../theme";
import DataBox from "../DataBox";
import {
  Business,
  DownloadOutlined,
  Person,
  PersonAdd,
  PersonOff,
  School,
  Work,
  WorkspacePremium,
} from "@mui/icons-material";
import ScholarsBar from "../charts/ScholarsBar";
import TerminationPie from "../charts/TerminationPie";
import AgePie from "../charts/AgePie";
import GenderPie from "../charts/GenderPie";
import GeoChoropleth from "../charts/GeoChoropleth";

const Dashboard = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [scholars] = useContext(ScholarContext);
  const [trigger] = useContext(TriggerContext);
  const isNonLaptop = useMediaQuery("(min-width:1200px");
  const [scholarsCopy, setScholarsCopy] = useState(scholars);

  const [filters, setFilters] = useState({
    bu: "",
    city: "",
    province: "",
    island: "",
    fromDate: 0,
    toDate: 0,
  });

  useEffect(() => {
    let filteredScholars = scholars;

    // Apply business unit filter
    if (filters.bu) {
      filteredScholars = filteredScholars.filter(
        (scholar) => scholar.sponsoringBusinessUnit === filters.bu
      );
    }

    // Apply city filter
    if (filters.city) {
      filteredScholars = filteredScholars.filter(
        (scholar) => scholar.city === filters.city
      );
    }

    // Apply province filter
    if (filters.province) {
      filteredScholars = filteredScholars.filter(
        (scholar) => scholar.province === filters.province
      );
    }

    // Apply island filter
    if (filters.island) {
      filteredScholars = filteredScholars.filter(
        (scholar) => scholar.island === filters.island
      );
    }

    // Apply date filter
    if (filters.fromDate && filters.toDate) {
      filteredScholars = filteredScholars.filter((scholar) => {
        return (
          scholar.yearAdmitted >= filters.fromDate &&
          scholar.yearAdmitted <= filters.toDate
        );
      });
    }

    setScholarsCopy(filteredScholars);
  }, [trigger, scholars, filters]);

  // Filter Category Functions
  const filterBu = useCallback((bu) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      bu: bu,
    }));
  }, []);

  const filterCity = useCallback((city) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      city: city,
    }));
  }, []);

  const filterProvince = useCallback((province) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      province: province,
    }));
  }, []);

  const filterIsland = useCallback((island) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      island: island,
    }));
  }, []);

  const filterFromDate = useCallback((date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      fromDate: date,
    }));
  }, []);

  const filterToDate = useCallback((date) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      toDate: date,
    }));
  }, []);

  if (!scholars) {
    return <div>...Loading</div>;
  }

  if (!scholarsCopy) {
    return null;
  }

  // Scholar status arrays
  const activeScholars = scholarsCopy.filter(
    (scholar) => scholar.status === "Active"
  );
  const graduatedScholars = scholarsCopy.filter(
    (scholar) => scholar.status === "Graduated"
  );
  const terminatedScholars = scholarsCopy.filter(
    (scholar) => scholar.status === "Terminated"
  );

  // Graduated and Employed Scholars Array
  const graduatedWithHonors = graduatedScholars.filter(
    (graduate) => graduate.latinHonors !== "N/A"
  );

  const employedGraduates = graduatedScholars.filter(
    (graduate) => graduate.employed === "Yes"
  );

  const employedInAboitiz = employedGraduates.filter(
    (graduate) => graduate.aboitizCompany === "Yes"
  );

  // Push each business unit intro an array
  const businessUnits = scholars.reduce((businessUnits, scholar) => {
    if (
      !businessUnits.includes(scholar.sponsoringBusinessUnit) &&
      scholar.sponsoringBusinessUnit !== ""
    ) {
      businessUnits.push(scholar.sponsoringBusinessUnit);
    }
    return businessUnits;
  }, []);

  // Push each cities with scholar intro an array
  const cities = scholars.reduce((cities, scholar) => {
    if (!cities.includes(scholar.city)) {
      cities.push(scholar.city);
    }
    return cities;
  }, []);

  // Push each provinces with scholar intro an array
  const provinces = scholars.reduce((provinces, scholar) => {
    if (!provinces.includes(scholar.province)) {
      provinces.push(scholar.province);
    }
    return provinces;
  }, []);

  // Push each island group with scholar intro an array
  const islandGroups = scholars.reduce((islandGroups, scholar) => {
    if (!islandGroups.includes(scholar.island)) {
      islandGroups.push(scholar.island);
    }
    return islandGroups;
  }, []);

  return (
    <Box m="20px">
      <Header title="Dashboard" subtitle="Scholars Dashboard" />
      {/* DATA FILTERS */}
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} lg={2}>
          <Box>
            <Filter
              label="Business Unit"
              categories={businessUnits}
              filterCategory={filterBu}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <Box>
            <Filter
              label="City"
              categories={cities}
              filterCategory={filterCity}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <Box>
            <Filter
              label="Province"
              categories={provinces}
              filterCategory={filterProvince}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <Box>
            <Filter
              label="Island Group"
              categories={islandGroups}
              filterCategory={filterIsland}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <Box>
            <DateFilter label="From Year" filterCategory={filterFromDate} />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <Box>
            <DateFilter label="To Year" filterCategory={filterToDate} />
          </Box>
        </Grid>
      </Grid>
      {/* DATA WIDGETS */}
      {/* General Info */}
      <Grid container spacing={1} mt="10px">
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90px"
          >
            <DataBox
              title={scholarsCopy.length}
              subtitle="Total Scholars"
              progress={scholarsCopy.length / scholarsCopy.length}
              percentage={`${
                (scholarsCopy.length / scholarsCopy.length) * 100
              }%`}
              icon={
                <School
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90px"
          >
            <DataBox
              title={activeScholars.length}
              subtitle="Active Scholars"
              progress={activeScholars.length / scholarsCopy.length}
              percentage={`${Math.round(
                (activeScholars.length / scholarsCopy.length) * 100
              )}%`}
              icon={
                <Person
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90px"
          >
            <DataBox
              title={graduatedScholars.length}
              subtitle="Graduated Scholars"
              progress={graduatedScholars.length / scholarsCopy.length}
              percentage={`${Math.round(
                (graduatedScholars.length / scholarsCopy.length) * 100
              )}%`}
              icon={
                <PersonAdd
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90px"
          >
            <DataBox
              title={terminatedScholars.length}
              subtitle="Terminated Scholars"
              progress={terminatedScholars.length / scholarsCopy.length}
              percentage={`${Math.round(
                (terminatedScholars.length / scholarsCopy.length) * 100
              )}%`}
              icon={
                <PersonOff
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        {/* Graduated Info */}
        <Grid item xs={12} sm={12} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90px"
          >
            <DataBox
              title={graduatedWithHonors.length}
              subtitle="Graduated w/ Latin Honors"
              progress={graduatedWithHonors.length / graduatedScholars.length}
              percentage={`${Math.round(
                (graduatedWithHonors.length / graduatedScholars.length) * 100
              )}%(Graduates)`}
              icon={
                <WorkspacePremium
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90px"
          >
            <DataBox
              title={employedGraduates.length}
              subtitle="Employed Graduates"
              progress={employedGraduates.length / graduatedScholars.length}
              percentage={`${Math.round(
                (employedGraduates.length / graduatedScholars.length) * 100
              )}%(Graduates)`}
              icon={
                <Work sx={{ color: colors.redAccent[500], fontSize: "26px" }} />
              }
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Box
            backgroundColor={colors.primary[900]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="90px"
          >
            <DataBox
              title={employedInAboitiz.length}
              subtitle="Employed in Aboitiz Companies"
              progress={employedInAboitiz.length / graduatedScholars.length}
              percentage={`${Math.round(
                (employedInAboitiz.length / graduatedScholars.length) * 100
              )}%(Graduates)`}
              icon={
                <Business
                  sx={{ color: colors.redAccent[500], fontSize: "26px" }}
                />
              }
            />
          </Box>
        </Grid>
        {/* Charts */}
        <Grid item xs={12} sm={12} lg={8}>
          <Box backgroundColor={colors.primary[900]} height="450px">
            <Box
              p="25px"
              mt="0 25px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.black[500]}
                >
                  Scholars
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.redAccent[500]}
                >
                  {scholarsCopy.length}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlined
                    sx={{ fontSize: "26px", color: colors.redAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ overflowY: "hidden" }}>
              <Box
                height="380px"
                mt="-40px"
                width={isNonLaptop ? undefined : "1000px"}
              >
                <ScholarsBar scholarsData={scholarsCopy} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Box height="450px" backgroundColor={colors.primary[900]}>
            <Box
              p="25px"
              mt="0 25px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.black[500]}
                >
                  Age Group
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlined
                    sx={{ fontSize: "26px", color: colors.redAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ overflowY: "hidden" }} mt="-40px">
              <Box height="350px">
                <AgePie scholarsData={scholarsCopy} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Box height="450px" backgroundColor={colors.primary[900]}>
            <Box
              p="25px"
              mt="0 25px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.black[500]}
                >
                  Gender Group
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlined
                    sx={{ fontSize: "26px", color: colors.redAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ overflowY: "hidden" }} mt="-40px">
              <Box height="350px">
                <GenderPie scholarsData={scholarsCopy} />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={8}>
          <Box height="450px" backgroundColor={colors.primary[900]}>
            <Box
              p="25px"
              mt="0 25px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.black[500]}
                >
                  Terminated Scholars
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.redAccent[500]}
                >
                  {terminatedScholars.length}
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlined
                    sx={{ fontSize: "26px", color: colors.redAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box height="380px" mt="-60px">
              <TerminationPie
                scholarsData={scholarsCopy}
                terminatedScholars={terminatedScholars}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <Box height="900px" backgroundColor={colors.primary[900]}>
            <Box
              p="25px"
              mt="0 25px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.black[500]}
                >
                  Scholars City Map
                </Typography>
              </Box>
              <Box>
                <IconButton>
                  <DownloadOutlined
                    sx={{ fontSize: "26px", color: colors.redAccent[500] }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ overflowY:"hidden" }} mt="-60px">
              <Box height="850px" width={isNonLaptop ? undefined : "1000px"}>
                <GeoChoropleth scholarsData={scholarsCopy} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
