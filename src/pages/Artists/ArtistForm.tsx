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
    name: yup.string().required().label("Artist Name"),
    genre: yup.string().required().label("Genre"),
  })
  .required();

export interface UserFormInput {
  name: string;
  genre: string;
}

export default function ArtistEntry() {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      genre: "",
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
          Add New Artist
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
            <InputLabel sx={{ fontWeight: 600 }}>Artist Name</InputLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: "300px" }}
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Please Enter Artist Name"
                  error={Boolean(errors.name)}
                  helperText={errors.name && errors.name.message}
                />
              )}
            />
          </Box>
          <Box>
            <InputLabel sx={{ fontWeight: 600 }}>Genre</InputLabel>
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: "300px" }}
                  {...field}
                  fullWidth
                  size="small"
                  placeholder="Please Enter Genre Address"
                  error={Boolean(errors.genre)}
                  helperText={errors.genre && errors.genre.message}
                />
              )}
            />
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
          title1="Add Artist Entry"
          //   onClick1={handleSubmit(handleleArtistDetails)}
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
