import { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  styled,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

interface UserEntryProps {
  open: boolean;
  onClose: () => void;
}

const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: "800px",
  minWidth: "650px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  borderRadius: "8px",
  outline: "none",
}));

export default function UserEntry({ open, onClose }: UserEntryProps) {
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

  const handleUserSubmit = async (data: UserFormInput) => {
    try {
      // Your API submission logic here
      console.log("Form data:", data);

      // On success
      setSuccessMsgs("User added successfully!");
      setSnackbarSuccessOpen(true);
      reset();
      onClose();
    } catch (error) {
      // On error
      setErrorMsgs("Failed to add user. Please try again.");
      setSnackbarErrorOpen(true);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="user-entry-modal"
        aria-describedby="modal-to-add-new-user"
      >
        <ModalContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ width: "auto" }}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "19px",
                  color: "#212121",
                  width: "max-content",
                  borderBottom: `1px solid ${theme.palette.secondary.main}`,
                }}
              >
                Add New User
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(handleUserSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              width: "100%",
            }}
          >
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
                        type="password"
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
                          <MenuItem value={"artist" as UserRole}>
                            Artist
                          </MenuItem>
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
                marginTop: "20px",
              }}
            >
              <RoundedButton
                title1="Complete User Entry"
                onClick1={handleSubmit(handleUserSubmit)}
                // loading={isPending}
              />
            </Box>
          </Box>
        </ModalContent>
      </Modal>

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
    </>
  );
}
