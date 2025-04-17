// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import RoundedButton from "../components/Button/Button";
import SuccessBar from "../components/Snackbar/SuccessBar";
import ErrorBar from "../components/Snackbar/ErrorBar";
import { RegisterData } from "../types/user";
import { ROLES } from "../constants/roles";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Register: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);

    // Set default role for new registration
    const payload = {
      ...data,
      role: ROLES.ARTIST_MANAGER, // Default role, can be changed based on your requirements
    };

    try {
      // Mock API call - replace with actual API call
      console.log("Registration payload:", payload);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage("Registration successful! Please login.");
      setOpenSuccess(true);

      // Redirect to login after a short delay
      //   setTimeout(() => {
      //     navigate("/");
      //   }, 2000);
    } catch (error) {
      setErrorMessage("Error occurred during registration.");
      setOpenError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <SuccessBar
        snackbarOpen={openSuccess}
        setSnackbarOpen={setOpenSuccess}
        message={successMessage}
      />
      <ErrorBar
        snackbarOpen={openError}
        setSnackbarOpen={setOpenError}
        message={errorMessage}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Box
          sx={{
            py: 4,
            px: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "400px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.primary.main, fontWeight: 600, mb: 1 }}
            >
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Register as a new admin user
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(handleRegister)}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
            >
              <Controller
                name="username"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showPassword ? "text" : "password"}
                    size="small"
                    fullWidth
                    label="Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((show) => !show)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showConfirmPassword ? "text" : "password"}
                    size="small"
                    fullWidth
                    label="Confirm Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword((show) => !show)
                            }
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />

              <Box sx={{ alignSelf: "center" }}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <RoundedButton
                    title1="Register"
                    loading={isLoading}
                    disable1={isLoading}
                  />
                </Box>
              </Box>

              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/")}
                    sx={{ fontWeight: 600 }}
                  >
                    Login
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Register;
