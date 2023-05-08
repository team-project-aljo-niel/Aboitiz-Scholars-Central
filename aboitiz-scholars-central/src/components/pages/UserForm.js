import { Alert, Box, Button, Snackbar, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header";
import { createUser } from "../services/UserService";
import { useState } from "react";
import { TriggerContext } from "../providers/TriggerProvider";
import { useContext } from "react";

const initialValues = {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
};

const userSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters")
    .matches(
      /[a-z]/,
      "Your password should contain at least one lowercase letter"
    )
    .matches(
      /[A-Z]/,
      "Your password should contain at least one uppercase letter"
    )
    .matches(/\d/, "Your password should contain at least one digit")
    .matches(
      // eslint-disable-next-line
      /[!@#$%^&*()_+\-=\]\[{};':"\\|,.<>\/?]/,
      "Your password should contain at least one special character."
    )
    .required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
});

const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px");
  const [responseMessage, setResponseMessage] = useState("");
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [snackbar, setSnackbar] = useState();
  const handleCloseSnackbar = () => setSnackbar(null);

  const handleFormSubmit = async (values) => {
    try {
      const user = {
        userName: values.userName,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };

      const response = await createUser(user);
      setResponseMessage(response.data.message);
      setSnackbar({ children: "User successfully created", severity: "success" });
      setTrigger(!trigger);
    } catch (error) {
      console.log(error);
      setResponseMessage(error.response.data.message);
      setSnackbar({ children: error.response.data.message, severity: "error" });
    }
  };

  return (
    <Box m="20px">
      <Header title="Create User" subtitle="Create new user" />

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
                error={
                  (!!touched.userName && !!errors.userName) ||
                  responseMessage === "Username already exists"
                }
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
              {responseMessage === "Username already exists" ? (
                <Typography
                  fontSize="12px"
                  sx={{
                    gridColumn: "span 4",
                    color: "#d96464",
                    m: "-15px 0 0 14px",
                  }}
                >
                  {responseMessage}
                </Typography>
              ) : undefined}
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={
                  (!!touched.email && !!errors.email) ||
                  responseMessage === "Email already exists"
                }
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              {responseMessage === "Email already exists" ? (
                <Typography
                  sx={{
                    gridColumn: "span 4",
                    color: "#d96464",
                    m: "-15px 0 0 14px",
                  }}
                >
                  {responseMessage}
                </Typography>
              ) : undefined}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
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

export default UserForm;
