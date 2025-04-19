import { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
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
import CloseIcon from "@mui/icons-material/Close";

const schema = yup
  .object()
  .shape({
    name: yup.string().required().label("Artist Name"),
    genre: yup.string().required().label("Genre"),
  })
  .required();

export interface ArtistFormInput {
  name: string;
  genre: string;
}

interface ArtistEntryProps {
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

export default function ArtistEntry({ open, onClose }: ArtistEntryProps) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ArtistFormInput>({
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

  const handleArtistSubmit = async (data: ArtistFormInput) => {
    try {
      console.log("Form data:", data);

      // On success
      setSuccessMsgs("Artist added successfully!");
      setSnackbarSuccessOpen(true);
      reset();
      onClose();
    } catch (error) {
      // On error
      setErrorMsgs("Failed to add artist. Please try again.");
      setSnackbarErrorOpen(true);
    }
  };

  // Helper function to extract error messages

  return (
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
              Add New Artist
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit(handleArtistSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            width: "100%",
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
            ></Typography>
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
      </ModalContent>
    </Modal>
  );
}
