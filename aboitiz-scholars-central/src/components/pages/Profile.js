import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
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

const Profile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [responseMessage, setResponseMessage] = useState("");
  const [currentUser] = useContext(CurrentUserContext);
  const [snackbar, setSnackbar] = useState();
  const [honors, setHonors] = useState("n/a");

  if (!currentUser) {
    return <div>...Loading</div>;
  }

  const initialValues = {
    schoolAttended: currentUser.schoolAttended || "",
    degreeOrProgram: currentUser.degreeOrProgram || "",
    yearAdmitted: currentUser.yearAdmitted || "",
    yearEndedOrGraduated: currentUser.yearEndedOrGraduated || "",
    latinHonors: currentUser.latinHonors || "",
    employed: currentUser.employed || "No",
    aboitizCompany: currentUser.aboitizCompany || "No",
    designation: currentUser.designation || "",
    company: currentUser.company || "",
  };

  const userSchema = yup.object().shape({
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
    <Box m="20px" width="80%">
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(8, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 8" },
              }}
            >
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
                  helperText={touched.yearAdmitted && errors.yearAdmitted}
                >
                  {years.map((year) => (
                    <MenuItem value={year}>{year}</MenuItem>
                  ))}
                </Select>
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
                  helperText={
                    touched.yearEndedOrGraduated && errors.yearEndedOrGraduated
                  }
                >
                  <MenuItem value={"n/a"}>N/A</MenuItem>
                  {years.map((year) => (
                    <MenuItem value={year}>{year}</MenuItem>
                  ))}
                </Select>
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
                  helperText={touched.latinHonors && errors.latinHonors}
                >
                  <MenuItem value={"n/a"}>N/A</MenuItem>
                  <MenuItem value={"Summa Cum Laude"}>Summa Cum Laude</MenuItem>
                  <MenuItem value={"Magna Cum Laude"}>Magna Cum Laude</MenuItem>
                  <MenuItem value={"Cum Laude"}>Cum Laude</MenuItem>
                </Select>
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
                  error={!!touched.employed && !!errors.employed}
                  helperText={touched.employed && errors.employed}
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
                  error={!!touched.aboitizCompany && !!errors.aboitizCompany}
                  helperText={touched.aboitizCompany && errors.aboitizCompany}
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
