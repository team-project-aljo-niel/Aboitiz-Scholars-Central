import {
  Alert,
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../Header";
import { useState } from "react";
import { CurrentUserContext } from "../providers/CurrentUserProvider";
import { useContext } from "react";
import phGeo from "../data/phGeo";

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [responseMessage, setResponseMessage] = useState("");
  const [currentUser] = useContext(CurrentUserContext);
  const [snackbar, setSnackbar] = useState();
  const [honors, setHonors] = useState("n/a");
  const scholarData = currentUser.scholarData[0];
  if (!currentUser) {
    return <div>...Loading</div>;
  }

  const initialValues = {
    address: scholarData?.address || "",
    city: scholarData?.city || "",
    province: scholarData?.province || "",
    island: scholarData?.island || "",
    schoolAttended: scholarData?.schoolAttended || "",
    degreeOrProgram: scholarData?.degreeOrProgram || "",
    yearAdmitted: scholarData?.yearAdmitted || "",
    yearEndedOrGraduated: scholarData?.yearEndedOrGraduated || "",
    latinHonors: scholarData?.latinHonors || "",
    employed: scholarData?.employed || "No",
    aboitizCompany: scholarData?.aboitizCompany || "No",
    designation: scholarData?.designation || "",
    company: scholarData?.company || "",
  };

  const userSchema = yup.object().shape({
    address: yup.string(),
    city: yup.string().required("required"),
    province: yup.string(),
    island: yup.string().required("required"),
    schoolAttended: yup.string(),
    degreeOrProgram: yup.string(),
    yearAdmitted: yup.string(),
    yearEndedOrGraduated: yup.string(),
    latinHonors: yup.string(),
    employed: yup.string(),
    aboitizCompany: yup.string(),
    designation: yup.string(),
    company: yup.string(),
  });

  const handleCloseSnackbar = () => setSnackbar(null);

  const date = new Date();
  const currentYear = date.getFullYear();
  let years = [];

  for (let i = currentYear; i >= currentYear - 20; i--) {
    years.push(i);
  }

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="My Profile" subtitle="Scholar Information" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 2" }}
              />
              <Autocomplete
                autoHighlight
                fullWidth
                name="city"
                options={phGeo}
                value={{ city: values.city }}
                isOptionEqualToValue={(option, value) => option.city === value.city}
                getOptionLabel={(option) => option.city}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={`${option.city}${option.lat}`}>
                      {option.city}
                    </li>
                  );
                }}
                onChange={(e, value) => {
                  setFieldValue(
                    "city",
                    value !== null ? value.city : initialValues.city
                  );
                  setFieldValue(
                    "province",
                    value !== null ? value.admin_name : initialValues.province
                  );
                }}
                onBlur={handleBlur}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Choose a City"
                    error={!!touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                  />
                )}
              />
              <TextField
                fullWidth
                variant="filled"
                InputProps={{ readOnly: true }}
                type="text"
                label="Province"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.province}
                name="province"
                error={!!touched.province && !!errors.province}
                helperText={touched.province && errors.province}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Island Group
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Island Group"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.island}
                  name="island"
                  error={!!touched.island && !!errors.island}
                >
                  <MenuItem value={"Luzon"}>Luzon</MenuItem>
                  <MenuItem value={"Visayas"}>Visayas</MenuItem>
                  <MenuItem value={"Mindanao"}>Mindanao</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.island && errors.island}
                </FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="School Attended"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.schoolAttended}
                name="schoolAttended"
                error={!!touched.schoolAttended && !!errors.schoolAttended}
                helperText={touched.schoolAttended && errors.schoolAttended}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Degree/Program"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.degreeOrProgram}
                name="degreeOrProgram"
                error={!!touched.degreeOrProgram && !!errors.degreeOrProgram}
                helperText={touched.degreeOrProgram && errors.degreeOrProgram}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Year Admitted
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Year Admitted"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.yearAdmitted}
                  name="yearAdmitted"
                  error={!!touched.yearAdmitted && !!errors.yearAdmitted}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.yearAdmitted && errors.yearAdmitted}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Year Graduated
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Year Graduated"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.yearEndedOrGraduated}
                  name="yearEndedOrGraduated"
                  error={
                    !!touched.yearEndedOrGraduated &&
                    !!errors.yearEndedOrGraduated
                  }
                >
                  <MenuItem value={"n/a"}>N/A</MenuItem>
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {touched.yearEndedOrGraduated && errors.yearEndedOrGraduated}
                </FormHelperText>
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel id="demo-simple-select-label">
                  Latin Honors
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Latin Honors"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.latinHonors}
                  name="latinHonors"
                  error={!!touched.latinHonors && !!errors.latinHonors}
                >
                  <MenuItem value={"n/a"}>N/A</MenuItem>
                  <MenuItem value={"Summa Cum Laude"}>Summa Cum Laude</MenuItem>
                  <MenuItem value={"Magna Cum Laude"}>Magna Cum Laude</MenuItem>
                  <MenuItem value={"Cum Laude"}>Cum Laude</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.latinHonors && errors.latinHonors}
                </FormHelperText>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 1" }}>
                <FormLabel id="employed-row-radio-buttons-group-label">
                  Employed?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="employed-row-radio-buttons-group-label"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.employed}
                  name="employed"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ gridColumn: "span 1" }}>
                <FormLabel id="aboitiz-row-radio-buttons-group-label">
                  Aboitiz Company?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="aboitiz-row-radio-buttons-group-label"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.aboitizCompany}
                  name="aboitizCompany"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                disabled={values.employed === "Yes" ? false : true}
                type="text"
                label="Company"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.employed === "Yes" ? values.company : ""}
                name="company"
                error={!!touched.company && !!errors.company}
                helperText={touched.company && errors.company}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                disabled={values.employed === "Yes" ? false : true}
                type="text"
                label="Designation"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.designation}
                name="designation"
                error={!!touched.designation && !!errors.designation}
                helperText={touched.designation && errors.designation}
                sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Request Update Approval
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

export default Profile;
