import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [validation, setValidation] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const showPass = (e) => {
    setShow(!show);
  };

  const defaultTheme = createTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          address,
          phoneNumber,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data.errors);
        setValidation(response.data.errors);
      }
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ backgroundColor: "white", height: "100vh" }}>
        <CssBaseline />
        <Container
          component="main"
          maxWidth="xs"
          sx={{ backgroundColor: "white" }}
        >
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {validation.firstName ? (<p className="text-danger"> {validation.firstName.message}</p>) : ("")}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {validation.lastName ? (<p className="text-danger"> {validation.lastName.message}</p>) : ("")}
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                {validation.email ? (<p className="text-danger"> {validation.email.message}</p>) : ("")}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="text"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {validation.password ? (<p className="text-danger"> {validation.password.message}</p>) : ("")}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="confirmPassword"
                    id="confirmpassword"
                    autoComplete="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                {validation.confirmPassword
                  ? (<p className="text-danger"> {validation.confirmPassword.message}</p>) : ("")}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                {validation.phoneNumber ? (<p className="text-danger"> {validation.phoneNumber.message}</p>) : ("")}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Grid>
                {validation.address ? (<p className="text-danger"> {validation.address.message}</p>) : ("")}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to={"/login"} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Signup;
