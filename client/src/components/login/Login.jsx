import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useParams, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import videoBackground from "../../images/bg-video.mp4";
import Logo from '../../images/foodIcon.jpg';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);


  const showPass = (e) => {
    setShow(!show);
  };

  const defaultTheme = createTheme();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response);
        localStorage.setItem("userId", response.data.user._id);
        console.log(localStorage.getItem("userId"));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.errors);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <video
          src={videoBackground}
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 14,
              mx: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              zIndex: 1,
              padding: "20px",
            }}
          >
            <Avatar sx={{ width: 100, height: 100 }}>
              <img
                src={Logo}
                alt="Red onion logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "white" }}>
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email ? (
                <p className="text-danger"> {errors.email.message}</p>
              ) : (
                ""
              )}
              <TextField
                type={show ? "text" : "password"}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button onClick={showPass}>{show ? "Hide" : "Show"}</Button>
                  ),
                }}
              />
              {errors.password ? (
                <p className="text-danger"> {errors.password.message}</p>
              ) : (
                ""
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleLogin}
              >
                Log In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to={"/signup"} variant="body2">
                    <p>Don't have an account? Sign Up</p>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
