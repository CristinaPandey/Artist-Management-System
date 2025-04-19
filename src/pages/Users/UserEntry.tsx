import { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import RoundedButton from "../../components/Button/Button";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
import { UserRole } from "../../types";

const schema = yup
  .object()
  .shape({
    username: yup.string().required().label("User Name"),
    email: yup.string().required().label("Email "),
    password: yup.string().required().label("Password"),
    role: yup.string().required().label("Role Type"),
  })
  .required();

export interface UserFormInput {
  username: string;
  email: string;
  password: string;
  role: string;
}

export default function UserEntry() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "super_admin",
    },
  });

  const [errorMsgs, setErrorMsgs] = useState<string>("");
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState<boolean>(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] =
    useState<boolean>(false);

  const handleUserSubmit = async () => {};

  // Helper function to extract error messages

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: { xs: "100%", sm: "80%", md: "100%", lg: "70%" },
      }}
    >
      <Box sx={{ width: "50px" }}>
        <Typography
          sx={{
            my: 1,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            color: "#212121",
            textAlign: "center",
            width: "max-content",
            borderBottom: `1px solid ${theme.palette.secondary.main}`,
          }}
        >
          Add New User
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Box>
            <InputLabel sx={{ fontWeight: 600 }}>Username</InputLabel>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: "300px" }}
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Please Enter User Name"
                  error={Boolean(errors.username)}
                  helperText={errors.username && errors.username.message}
                />
              )}
            />
          </Box>
          <Box>
            <InputLabel sx={{ fontWeight: 600 }}>Email</InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: "300px" }}
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Please Enter Email Address"
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                />
              )}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
          }}
        >
          <Box>
            <InputLabel sx={{ fontWeight: 600 }}>Password</InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: "300px" }}
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Please Enter Password"
                  error={Boolean(errors.password)}
                  helperText={errors.password && errors.password.message}
                />
              )}
            />
          </Box>
          <Box>
            <InputLabel sx={{ fontWeight: 600 }}>Role</InputLabel>
            <Box sx={{ width: "300px" }}>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} size="small" fullWidth>
                    <MenuItem value={"super_admin" as UserRole}>
                      Super Admin
                    </MenuItem>
                    <MenuItem value={"artist_manager" as UserRole}>
                      Artist Manager
                    </MenuItem>
                    <MenuItem value={"artist" as UserRole}>Artist</MenuItem>
                  </Select>
                )}
              />
              {errors.role && (
                <Typography sx={{ fontSize: "12px" }} color="error">
                  {errors.role.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginTop: "10px",
        }}
      >
        <RoundedButton
          title1="Complete User Entry"
          //   onClick1={handleSubmit(handleUserDetails)}
          //   loading={isPending}
        />
      </Box>
      <SuccessBar
        snackbarOpen={snackbarSuccessOpen}
        setSnackbarOpen={setSnackbarSuccessOpen}
        message={successMsgs}
      />
      <ErrorBar
        snackbarOpen={snackbarErrorOpen}
        setSnackbarOpen={setSnackbarErrorOpen}
        message={errorMsgs}
      />
    </Box>
  );
}
