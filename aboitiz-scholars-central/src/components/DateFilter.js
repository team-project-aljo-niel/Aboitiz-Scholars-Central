import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";

const DateFilter = ({ label, filterCategory }) => {
  const [filter, setFilter] = useState("");
  const date = new Date();
  const currentYear = date.getFullYear();
  let years = [];

  for (let i = currentYear; i >= 2000; i--) {
    years.push(i);
  }

  return (
    <Autocomplete
      disablePortal
      autoHighlight
      id="combo-box-demo"
      options={years}
      getOptionLabel={(option) => option.toString()}
      isOptionEqualToValue={(option, value) => option === value}
      fullWidth
      value={filter}
      onChange={(e, value) => {
        setFilter(value)
        filterCategory(value)
      }}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} />
      )}
    />
  );
};

export default DateFilter;
