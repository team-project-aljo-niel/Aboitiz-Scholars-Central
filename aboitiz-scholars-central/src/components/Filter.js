import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const Filter = ({ label, categories, filterCategory }) => {
  const [filter, setFilter] = useState("");

  return (
    <Autocomplete
      disablePortal
      autoHighlight
      id="combo-box-demo"
      options={categories}
      fullWidth
      value={filter}
      onChange={(e, value) => {
        setFilter(value)
        filterCategory(value)
      }}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} variant="filled" label={label} />
      )}
    />
  );
};

export default Filter;
