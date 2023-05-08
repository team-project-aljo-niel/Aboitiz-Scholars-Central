import { Box, useMediaQuery } from "@mui/material";
import Header from "../Header";
import { useContext } from "react";
import { ScholarContext } from "../providers/ScholarProvider";
import { useState } from "react";
import Filter from "../Filter";
import { TriggerContext } from "../providers/TriggerProvider";
import DateFilter from "../DateFilter";
import { useEffect } from "react";

const Dashboard = () => {
  const [scholars, setScholars] = useContext(ScholarContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [scholarsCopy, setScholarsCopy] = useState(scholars);
  // const [businessUnit, setBusinessUnit] =  useState([])
  useEffect(() => {}, [trigger]);

  if (!scholars) {
    return <div>...Loading</div>;
  }

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

  return (
    <Box m="20px">
      <Header title="Dashboard" subtitle="Scholars Dashboard" />
      <Box
        display="grid"
        gap="30px"
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
    </Box>
  );
};

export default Dashboard;
