import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { CurrentUserContext } from "../providers/CurrentUserProvider";
import { useContext, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { updateAccount, updateProfile } from "../services/UserService";

const Account = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [currentUser] = useContext(CurrentUserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [, setResponseMessage] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [snackbar, setSnackbar] = useState();
  const handleCloseSnackbar = () => setSnackbar(null);

  if (!currentUser) {
    return <div>...Loading</div>;
  }

  const initialValues = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    gender: currentUser.gender,
    email: currentUser.email,
    phone: currentUser.phone,
  };

  const accountInitialValues = {
    userName: currentUser.userName,
    newPassword: "",
    password: "",
    confirm: "",
  };

  const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    gender: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    phone: yup
      .string()
      .matches(/^(09|\+639)\d{9}$/, "Please input a valid PH number.")
      .required("required"),
  });

  const accountSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
    newPassword: yup
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
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required("required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const profile = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gender: values.gender,
        phone: values.phone,
      };

      const response = await updateProfile(profile);
      setResponseMessage(response.data.message);
      setSnackbar({
        children: "Profile successfully updated",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setResponseMessage(error.response.data.message);
      setSnackbar({ children: error.response.data.message, severity: "error" });
    }
  };

  const handleAccountSubmit = async (values) => {
    try {
      const account = {
        userName: values.userName,
        password: values.password,
        newPassword: values.newPassword,
      };
      const response = await updateAccount(account);
      setResponseMessage(response.data.message);
      setSnackbar({
        children: "Account successfully updated",
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      setResponseMessage(error.response.data.message);
      setSnackbar({ children: error.response.data.message, severity: "error" });
    }
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
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gender}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
                <FormHelperText>
                  {touched.gender && errors.gender}
                </FormHelperText>
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
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Current Password"
                />
              </FormControl>
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.passnewPasswordword}
                  name="newPassword"
                  error={!!touched.newPassword && !!errors.newPassword}
                  helperText={touched.newPassword && errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="New Password"
                />
              </FormControl>
              <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
                <TextField
                  fullWidth
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.confirm}
                  name="confirm"
                  error={!!touched.confirm && !!errors.confirm}
                  helperText={touched.confirm && errors.confirm}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Confirm Password"
                />
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Account
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

export default Account;
