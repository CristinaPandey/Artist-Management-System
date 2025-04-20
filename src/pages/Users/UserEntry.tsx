import { useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
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
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RoundedButton from "../../components/Button/Button";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
import { UserRole } from "../../types";
import { ROLES } from "../../constants/roles";
import { RegisterData } from "../../types/user";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAddUserMutation } from "../../services/Users/UsersServices";
import { Cake } from "@mui/icons-material";

const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  phone_number: yup
    .string()
    .matches(/^\+?[0-9]{10,14}$/, "Phone number must be valid")
    .required("Phone number is required"),
  date_of_birth: yup
    .date()
    .max(new Date(), "Date of birth cannot be in the future")
    .required("Date of birth is required")
    .nullable(),
  role: yup
    .mixed<UserRole>()
    .oneOf(Object.values(ROLES))
    .required("Role is required"),
});

interface ExtendedRegisterData extends RegisterData {
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  phone_number: string;
  date_of_birth: Date | null;
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
  } = useForm<ExtendedRegisterData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
      gender: "",
      address: "",
      phone_number: "",
      role: ROLES.ARTIST_MANAGER,
      date_of_birth: null,
    },
  });
  const [successClose, setSuccessClose] = useState<boolean>(false);

  const [errorMsgs, setErrorMsgs] = useState<string>("");
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState<boolean>(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] =
    useState<boolean>(false);

  const { mutate: AuthMutation, isPending } = useAddUserMutation();

  const handleUserSubmit = async (data: ExtendedRegisterData) => {
    const payload = {
      username: data?.username,
      email: data?.email,
      password: data?.password,
      first_name: data?.first_name,
      last_name: data.last_name,
      gender: data?.gender,
      address: data?.address,
      phone_number: data?.phone_number,
      // date_of_birth: data?.date_of_birth,
      date_of_birth: data?.date_of_birth || new Date(),
      role: data.role || ROLES.ARTIST_MANAGER,
    };
    AuthMutation(payload, {
      onSuccess: () => {
        setSuccessMsgs("User created Successful!");
        setSnackbarErrorOpen(false);
        setSnackbarSuccessOpen(true);
        setSuccessClose(false);
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          setErrorMsgs(
            error.response.data.message
              ? error.response.data.message
              : `Error Occured while logging in.`
          );
          setSnackbarErrorOpen(true);
        }
      },
    });
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
                  <InputLabel sx={{ fontWeight: 600 }}>
                    Confirm Password
                  </InputLabel>

                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        {...field}
                        size="small"
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
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
                  <InputLabel sx={{ fontWeight: 600 }}>First Name</InputLabel>
                  <Controller
                    name="first_name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        type="first_name"
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Please Enter First Name"
                        error={Boolean(errors.first_name)}
                        helperText={
                          errors.first_name && errors.first_name.message
                        }
                      />
                    )}
                  />
                </Box>
                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Last Name</InputLabel>

                  <Controller
                    name="last_name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        {...field}
                        size="small"
                        fullWidth
                        label="Last Name"
                        error={!!errors.last_name}
                        helperText={errors.last_name?.message}
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
                  <InputLabel sx={{ fontWeight: 600 }}>Gender</InputLabel>
                  <Box sx={{ width: "300px" }}>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <Select {...field} size="small" fullWidth>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                          <MenuItem value="prefer_not_to_say">
                            Prefer not to say
                          </MenuItem>
                        </Select>
                      )}
                    />
                    {errors.gender && (
                      <Typography sx={{ fontSize: "12px" }} color="error">
                        {errors.gender.message}
                      </Typography>
                    )}
                  </Box>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Address</InputLabel>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        type="address"
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Please Enter Address"
                        error={Boolean(errors.address)}
                        helperText={errors.address && errors.address.message}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Phone Number</InputLabel>

                  <Controller
                    name="phone_number"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        {...field}
                        size="small"
                        fullWidth
                        label="Phone Number"
                        error={!!errors.phone_number}
                        helperText={errors.phone_number?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Controller
                name="date_of_birth"
                control={control}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Date of Birth"
                      value={field.value}
                      onChange={(newValue: any) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          error: !!errors.date_of_birth,
                          helperText: errors.date_of_birth?.message,
                          InputProps: {
                            startAdornment: (
                              <InputAdornment position="start">
                                <Cake fontSize="small" />
                              </InputAdornment>
                            ),
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
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
                loading={isPending}
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
