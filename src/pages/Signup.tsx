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
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Home,
  Cake,
  Shield,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import RoundedButton from "../components/Button/Button";
import SuccessBar from "../components/Snackbar/SuccessBar";
import ErrorBar from "../components/Snackbar/ErrorBar";
import { RegisterData } from "../types/user";
import { ROLES } from "../constants/roles";
import { useRegisterMutation } from "../services/RegisterServices";
import { isAxiosError } from "axios";

// Extended schema with new fields
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
});

// Extended RegisterData type (should be updated in your types/user.ts file)
interface ExtendedRegisterData extends RegisterData {
  first_name: string;
  last_name: string;
  gender: string;
  address: string;
  phone_number: string;
  date_of_birth: Date | null;
}

const Register: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<ExtendedRegisterData>({
    resolver: yupResolver(schema),
    mode: "onChange",
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

  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);

  const { mutate: AuthMutation, isPending } = useRegisterMutation();

  const handleNext = async () => {
    const fields = [
      ["username", "email", "password", "confirmPassword"],
      ["first_name", "last_name", "gender"],
      ["address", "phone_number", "date_of_birth"],
    ];

    const result = await trigger(fields[activeStep] as any);
    if (result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRegister = async (data: ExtendedRegisterData) => {
    setIsLoading(true);

    // Set default role for new registration
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
      role: ROLES.ARTIST_MANAGER,
    };

    AuthMutation(payload, {
      onSuccess: () => {
        setSuccessMessage("Signup Successful!");
        setOpenError(false);
        setOpenSuccess(true);
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          setErrorMessage(
            error.response.data.message
              ? error.response.data.message
              : `Error Occured while logging in.`
          );
          setOpenError(true);
        }
      },
    });
  };

  const steps = [
    {
      label: "Account Information",
      description: "Create your account credentials",
      icon: <Shield fontSize="small" />,
      fields: (
        <>
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
                placeholder="johndoe123"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person fontSize="small" />
                    </InputAdornment>
                  ),
                }}
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
                placeholder="john.doe@example.com"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email fontSize="small" />
                    </InputAdornment>
                  ),
                }}
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
                        size="small"
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
                        onClick={() => setShowConfirmPassword((show) => !show)}
                        edge="end"
                        size="small"
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
        </>
      ),
    },
    {
      label: "Personal Information",
      description: "Tell us about yourself",
      icon: <Person fontSize="small" />,
      fields: (
        <>
          <Grid container spacing={2}>
            <Grid>
              <Controller
                name="first_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    label="First Name"
                    placeholder="John"
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}> */}
            <Grid>
              <Controller
                name="last_name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    size="small"
                    fullWidth
                    label="Last Name"
                    placeholder="Doe"
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Controller
            name="gender"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth size="small" error={!!errors.gender}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select {...field} labelId="gender-label" label="Gender">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer_not_to_say">
                    Prefer not to say
                  </MenuItem>
                </Select>
                {errors.gender && (
                  <FormHelperText>{errors.gender.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </>
      ),
    },
    {
      label: "Contact Information",
      description: "How can we reach you?",
      icon: <Phone fontSize="small" />,
      fields: (
        <>
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                label="Address"
                placeholder="123 Main St, City, Country"
                multiline
                rows={2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />

          <Controller
            name="phone_number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                label="Phone Number"
                placeholder="+1234567890"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            )}
          />

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
        </>
      ),
    },
  ];

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
          minHeight: "100vh",
          backgroundColor: theme.palette.primary.light,
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: { xs: "90%", sm: "550px" },
            maxWidth: "100%",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Create Account
            </Typography>
            <Typography variant="body2">
              Join our artist management platform
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 2, sm: 4 } }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      <Typography variant="caption">
                        {step.description}
                      </Typography>
                    }
                    icon={step.icon}
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <form onSubmit={handleSubmit(handleRegister)}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          mt: 2,
                        }}
                      >
                        {step.fields}

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Box>
                            {index > 0 && (
                              <RoundedButton
                                title1="Back"
                                onClick1={handleBack}
                              />
                            )}
                          </Box>
                          <Box>
                            {index === steps.length - 1 ? (
                              <RoundedButton
                                title1="Register"
                                loading={isPending}
                                disable1={isPending}
                                onClick1={handleSubmit(handleRegister)}
                              />
                            ) : (
                              <RoundedButton
                                title1="Continue"
                                onClick1={handleNext}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </form>
                  </StepContent>
                </Step>
              ))}
            </Stepper>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                  sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default Register;
