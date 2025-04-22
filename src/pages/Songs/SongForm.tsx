import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  FormHelperText,
  Modal,
  Typography,
  styled,
  IconButton,
  useTheme,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
import RoundedButton from "../../components/Button/Button";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { isAxiosError } from "axios";
import { useAddArtistSongMutation } from "../../services/Songs/SongServices";

const schema = yup
  .object()
  .shape({
    title: yup.string().required().label("Title"),
    release_date: yup.string().required().label("Release Date"),
    album: yup.string().required().label("Album"),
    duration: yup.number().required().label("Duration"),
  })
  .required();

interface SongEntryInput {
  title: string;
  album: string;
  release_date: string;
  duration: number;
}

interface SongEntryProps {
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

const SongEntry: React.FC<SongEntryProps> = ({ open, onClose }) => {
  const theme = useTheme();

  const [errorMsgs, setErrorMsgs] = useState<string>("");
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState<boolean>(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] =
    useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SongEntryInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      album: "",
      release_date: "",
    },
  });

  const { mutate: AuthMutation, isPending } = useAddArtistSongMutation();

  const handleSongSubmit = async (data: SongEntryInput) => {
    const payload = {
      title: data?.title,
      album: data?.album,
      release_date: data?.release_date,
      duration: data?.duration,
    };
    AuthMutation(payload, {
      onSuccess: () => {
        setSuccessMsgs("Song added Successful!");
        setSnackbarErrorOpen(false);
        setSnackbarSuccessOpen(true);
        onClose();
      },
      onError: (error: any) => {
        if (isAxiosError(error) && error.response) {
          setErrorMsgs(
            error.response.data.message
              ? error.response.data.message
              : `Error Occured while adding song.`
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
        aria-labelledby="song-entry-modal"
        aria-describedby="modal-to-add-new-song"
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
                Add New Song
              </Typography>
            </Box>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(handleSongSubmit)}
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
                  <InputLabel sx={{ fontWeight: 600 }}>Title</InputLabel>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Please Enter Title"
                        error={Boolean(errors.title)}
                        helperText={errors.title && errors.title.message}
                      />
                    )}
                  />
                </Box>
                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Album</InputLabel>
                  <Controller
                    name="album"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Please Enter Genre"
                        error={Boolean(errors.album)}
                        helperText={errors.album && errors.album.message}
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
                  <InputLabel sx={{ fontWeight: 600 }}>Release Date</InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box sx={{ width: "50%" }}>
                      <Controller
                        name="release_date"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            maxDate={dayjs()}
                            {...field}
                            sx={{
                              width: "300px",
                              "& .MuiSvgIcon-root": {
                                width: "16px",
                                height: "16px",
                              },
                            }}
                            slotProps={{ textField: { size: "small" } }}
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) =>
                              field.onChange(
                                date ? dayjs(date).format("YYYY-MM-DD") : null
                              )
                            }
                          />
                        )}
                      />
                    </Box>
                  </LocalizationProvider>
                </Box>
                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Duration</InputLabel>
                  <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Please Enter Duration"
                        error={Boolean(errors.duration)}
                        helperText={errors.duration && errors.duration.message}
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
                marginTop: "20px",
              }}
            >
              <RoundedButton
                title1="Add Song"
                onClick1={handleSubmit(handleSongSubmit)}
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
};

export default SongEntry;
