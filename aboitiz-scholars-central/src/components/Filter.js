import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";

const Filter = ({ label, categories }) => {
  const [filter, setFilter] = useState("");
  return (
    <Autocomplete
      disablePortal
      autoHighlight
      id="combo-box-demo"
      options={categories}
      fullWidth
      onChange={(e, value) => setFilter(value)}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} />
      )}
    />
  );
};

export default Filter;
