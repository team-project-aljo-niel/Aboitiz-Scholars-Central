import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../Header";
import { useContext } from "react";
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

const Dashboard = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [scholars, setScholars] = useContext(ScholarContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [scholarsCopy, setScholarsCopy] = useState(scholars);

  useEffect(() => {}, [trigger]);

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
    if (!businessUnits.includes(scholar.sponsoringBusinessUnit)) {
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

  businessUnits.shift();
  cities.shift();
  provinces.shift();
  islandGroups.shift();

  if (!scholars) {
    return <div>...Loading</div>;
  }

  return (
    <Box m="20px">
      <Header title="Dashboard" subtitle="Scholars Dashboard" />
      {/* DATA FILTERS */}
      <Box
        display="grid"
        gap="20px"
        mb="20px"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
        }}
      >
        <Box sx={{ gridColumn: "span 2" }}>
          <Filter label="Business Unit" categories={businessUnits} />
        </Box>
        <Box sx={{ gridColumn: "span 2" }}>
          {" "}
          <Filter
            label="City"
            categories={cities}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box sx={{ gridColumn: "span 2" }}>
          {" "}
          <Filter
            label="Province"
            categories={provinces}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box sx={{ gridColumn: "span 2" }}>
          {" "}
          <Filter
            label="Island Group"
            categories={islandGroups}
            sx={{ gridColumn: "span 2" }}
          />
        </Box>
        <Box sx={{ gridColumn: "span 2" }}>
          {" "}
          <DateFilter label="From Year" sx={{ gridColumn: "span 2" }} />
        </Box>
        <Box sx={{ gridColumn: "span 2" }}>
          {" "}
          <DateFilter label="To Year" sx={{ gridColumn: "span 2" }} />
        </Box>
      </Box>
      {/* DATA WIDGETS */}
      {/* General Info */}
      <Box
        display="grid"
        gap="10px"
        gridAutoRows="80px"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 6" },
        }}
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DataBox
            title={scholars.length}
            subtitle="Total Scholars"
            progress={scholarsCopy.length / scholarsCopy.length}
            percentage={`${(scholarsCopy.length / scholarsCopy.length) * 100}%`}
            icon={
              <School sx={{ color: colors.redAccent[500], fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <DataBox
            title={activeScholars.length}
            subtitle="Active Scholars"
            progress={activeScholars.length / scholarsCopy.length}
            percentage={`${Math.round(
              (activeScholars.length / scholarsCopy.length) * 100
            )}%`}
            icon={
              <Person sx={{ color: colors.redAccent[500], fontSize: "26px" }} />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
        {/* Graduated Info */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
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
        {/* Charts */}
        <Box
          gridColumn="span 8"
          gridRow="span 5"
          backgroundColor={colors.primary[900]}
        >
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
          <Box height="380px" mt="-40px">
            <ScholarsBar scholarsData={scholarsCopy} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 5"
          backgroundColor={colors.primary[900]}
        >
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
          <Box height="350px" mt="-60px">
            <AgePie
              scholarsData={scholarsCopy}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 5"
          backgroundColor={colors.primary[900]}
        >
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
          <Box height="350px" mt="-60px">
            <GenderPie
              scholarsData={scholarsCopy}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 5"
          backgroundColor={colors.primary[900]}
        >
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
      </Box>
    </Box>
  );
};

export default Dashboard;
