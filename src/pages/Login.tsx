import React, { useState } from "react";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// import Background from "../assets/Background.svg";

import RoundedButton from "../components/Button/Button";
import SuccessBar from "../components/Snackbar/SuccessBar";
import ErrorBar from "../components/Snackbar/ErrorBar";
import { Link, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "services/Auth/AuthServices";

export interface LoginData {
  username: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //   const { mutate: AuthMutation, isPending } = useLoginMutation();

  const handleLogin = async (data: LoginData) => {
    //     const payload = {
    //       username: data?.username,
    //       password: btoa(data?.password),
    //     };
    //     AuthMutation(payload, {
    //       onSuccess: () => {
    //         setSuccessMessage("Login Successful!");
    //         setOpenError(false);
    //         setOpenSuccess(true);
    //       },
    //       onError: (error) => {
    //         if (isAxiosError(error) && error.response) {
    //           setErrorMessage(
    //             error.response.data.responseData
    //               ? error.response.data.responseData.detail
    //               : `Error Occured while logging in.`
    //           );
    //           setOpenError(true);
    //         }
    //       },
    //     });
  };

  const handleOnClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/register", { replace: true });
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
      <form onSubmit={handleSubmit(handleLogin)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            //   backgroundImage: `url(${Background})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
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
            }}
          >
            <Box sx={{ alignSelf: "center" }}>{/* <img src={Logo} /> */}</Box>
            <Box>
              <Typography
                sx={{ color: theme.palette.secondary.main, fontWeight: 600 }}
              >
                Login to your account
              </Typography>
            </Box>

            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  fullWidth
                  placeholder="Username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  size="small"
                  fullWidth
                  placeholder="Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((show) => !show)}
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            <Box sx={{ alignSelf: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <RoundedButton
                  title1="Login"
                  //   loading={isPending}
                  //   disable1={isPending}
                />
              </Box>
            </Box>
            <Typography
              onClick={handleOnClick}
              variant="body2"
              sx={{
                textAlign: "center",
                mt: 2,
                cursor: "pointer",
                fontWeight: 550,
                color: theme.palette.secondary.main,
                "&:hover": {
                  color: theme.palette.secondary.dark,
                },
              }}
            >
              Don't have an account?
            </Typography>
          </Box>
        </Box>
      </form>
    </React.Fragment>
  );
};

export default Login;
