import { ColorModeContext, themeColors, useMode } from "../../theme";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router";

const initialValues = {
  userName: "",
  password: "",
};

const loginSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup.string().required("required"),
});

const Login = () => {
  const [theme, colorMode] = useMode();
  const colors = themeColors(theme.palette.mode);
  const [responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      if (values.password === "") {
        setResponseMessage("Please input password");
      }
      const user = {
        userName: values.userName,
        password: values.password,
      };
      const response = await loginUser(user);
      localStorage.setItem("token-auth", response.data.accessToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      navigate("/ASC");
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token-auth");
        setResponseMessage(error.response.data.message);
      }
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <main className="content">
            <Box display="flex" justifyContent="end" p={2}>
              <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "light" ? (
                    <LightModeOutlinedIcon />
                  ) : (
                    <DarkModeOutlinedIcon />
                  )}
                </IconButton>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <AccountCircleIcon sx={{ width: "150px", height: "150px" }} />
              <Typography
                variant="h2"
                textAlign="center"
                color={colors.black[500]}
                fontWeight="bold"
                sx={{ mb: "5px" }}
              >
                Aboitiz Scholars Central
              </Typography>
              <Typography variant="h3" mb="20px" color={colors.redAccent[400]}>
                Sign in to ASC
              </Typography>
              <Formik
                onSubmit={handleLogin}
                initialValues={initialValues}
                validationSchema={loginSchema}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit} style={{ minWidth: "320px" }}>
                    <Box display="flex" flexDirection="column" gap="30px">
                      <FormControl variant="outlined" fullWidth>
                        {/* <InputLabel htmlFor="outlined-adornment-username">
                          Username
                        </InputLabel> */}
                        <TextField
                          id="outlined-adornment-username"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.userName}
                          name="userName"
                          error={!!touched.userName && !!errors.userName}
                          helperText={touched.userName && errors.userName}
                          label="Username"
                          userName
                        />
                      </FormControl>
                      <FormControl variant="outlined" fullWidth>
                        {/* <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel> */}
                        <TextField
                          id="outlined-adornment-password"
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
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          label="Password"
                        />
                      </FormControl>
                      <Typography
                        variant="h5"
                        sx={{
                          gridColumn: "span 4",
                          color: "#d96464",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {responseMessage}
                      </Typography>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Sign In
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Login;
