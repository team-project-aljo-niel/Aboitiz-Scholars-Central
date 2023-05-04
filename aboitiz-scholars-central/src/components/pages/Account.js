import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";

const initialValues = {
  firstName: "",
  lastName: "",
  sex: "",
  email: "",
  phone: "",
};

const accountInitialValues = {
  userName: "",
  password: "",
  confirm: "",
};

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  sex: yup.string(),
  email: yup.string().email("Invalid email").required("required"),
  phone: yup
    .string()
    .matches(/^(09|\+639)\d{9}$/, "Please input a valid PH number."),
});

const accountSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup
    .string()
    .min(8, "*Your password must be at least 8 characters")
    .matches(
      /[a-z]/,
      "*Your password should contain at least one lowercase letter"
    )
    .matches(
      /[A-Z]/,
      "*Your password should contain at least one uppercase letter"
    )
    .matches(/\d/, "*Your password should contain at least one digit")
    .matches(
      // eslint-disable-next-line
      /[!@#$%^&*()_+\-=\]\[{};':"\\|,.<>\/?]/,
      "*Your password should contain at least one special character."
    )
    .required("required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Account = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  const handleAccountSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Basic Profile" subtitle="Basic user information" />

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
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
              >
                <InputLabel id="demo-simple-select-label">Sex</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sex"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sex}
                  name="sex"
                  error={!!touched.sex && !!errors.sex}
                  helperText={touched.sex && errors.sex}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Profile
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Header title="User Settings" subtitle="Account settings" />

      <Formik
        onSubmit={handleAccountSubmit}
        initialValues={accountInitialValues}
        validationSchema={accountSchema}
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
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirm}
                name="confirm"
                error={!!touched.confirm && !!errors.confirm}
                helperText={touched.confirm && errors.confirm}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Account Settings
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Account;
