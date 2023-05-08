import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

const DateFilter = ({ label }) => {
  const [filter, setFilter] = useState("");
  const date = new Date();
  const currentYear = date.getFullYear();
  let years = [];

  for (let i = currentYear; i >= currentYear - 20; i--) {
    years.push(i);
  }

  const dropDownItems = years.map((year) => {
    return <MenuItem key={year} value={year}>{year}</MenuItem>;
  });

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={filter}
        label={label}
        onChange={(e) => setFilter(e.target.value)}
      >
        <MenuItem value="All">All</MenuItem>
        {dropDownItems}
      </Select>
    </FormControl>
  );
};

export default DateFilter;
