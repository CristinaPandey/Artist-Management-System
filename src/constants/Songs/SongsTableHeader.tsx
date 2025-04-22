import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types";
import {
  Box,
  Button,
  IconButton,
  InputLabel,
  Modal,
  Select,
  styled,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";
import ErrorBar from "../../components/Snackbar/ErrorBar";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import DeleteIcon from "@mui/icons-material/Delete";
import { Song } from "../../pages/Songs/SongsList";
import {
  useDeleteArtistSong,
  useUpdateArtistSong,
} from "../../services/Songs/SongServices";
import { isAxiosError } from "axios";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RoundedButton from "../../components/Button/Button";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const SongsTableListEntryHeader: ColumnDef<Song>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: (data) => {
      return (
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
          {data?.row?.original?.id}
        </Typography>
      );
    },
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.title}
        </Typography>
      );
    },
  },
  {
    header: "Album",
    accessorKey: "album",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.album}
        </Typography>
      );
    },
  },
  {
    header: "Release Date",
    accessorKey: "release_date",
    cell: (data) => {
      return (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {data?.row?.original?.release_date?.split("T")[0]}
        </Typography>
      );
    },
  },
  {
    header: "Duration",
    accessorKey: "duration",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.duration}
        </Typography>
      );
    },
  },

  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => <ActionsCellEdit row={row} />,
  },
  //   const theme = useTheme();
  //   const [editOpen, setEditOpen] = useState<boolean>(false);
];

const ActionsCellEdit = ({ row }: { row: any }) => {
  const theme = useTheme();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [errorMsgs, setErrorMsgs] = useState<string>("");
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState<boolean>(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] =
    useState<boolean>(false);
  const { mutate: updateArtistSong } = useUpdateArtistSong(row.original.id);

  const schema = yup
    .object()
    .shape({
      title: yup.string().required().label("Title"),
      release_date: yup.string().required().label("Release Date"),
      album: yup.string().required().label("Album"),
      duration: yup.number().required().label("Duration"),
    })
    .required();

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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Song>({
    // resolver: yupResolver(schema),
    defaultValues: {
      title: row.original.title,
      album: row.original.album,
      release_date: row.original.release_date,
      duration: row.original.duration,
    },
  });

  useEffect(() => {
    if (editOpen) {
      reset({
        title: row.original.title,
        album: row.original.album,
        release_date: row.original.release_date,
        duration: row.original.duration,
      });
    }
  }, [editOpen, reset, row.original]);

  const handleEdit = () => setEditOpen(true);
  const handleClose = () => setEditOpen(false);

  const onUpdateSave = (formData: Song) => {
    const payload = {
      title: formData?.title,
      album: formData?.album,
      // release_date: formData?.release_date,
      release_date: formData?.release_date
        ? new Date(formData.release_date).toISOString().split("T")[0] // formats to 'YYYY-MM-DD'
        : undefined,
      duration: formData?.duration,
    };

    updateArtistSong(payload, {
      onSuccess: () => {
        setSuccessMsgs("User updated successfully!");
        setSnackbarSuccessOpen(true);
        setSnackbarErrorOpen(false);
        setEditOpen(false);
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          setErrorMsgs(
            error.response.data.message || "Error occurred while updating user."
          );
          setSnackbarErrorOpen(true);
        }
      },
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Modal open={editOpen} onClose={handleClose}>
          <ModalContent>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "19px",
                  color: "#212121",
                  borderBottom: `1px solid ${theme.palette.secondary.main}`,
                }}
              >
                Edit User
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit(onUpdateSave)}
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
                    <InputLabel sx={{ fontWeight: 600 }}>
                      Release Date
                    </InputLabel>
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
                          helperText={
                            errors.duration && errors.duration.message
                          }
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
                  // loading={isPending}
                />
              </Box>
            </Box>
          </ModalContent>
        </Modal>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            onClick={handleEdit}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 0.2,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Edit sx={{ fontSize: "16px" }} />
            <Typography
              fontSize="13px"
              fontWeight={600}
              sx={{ userSelect: "none" }}
            >
              Edit
            </Typography>
          </Box>
          <ActionCell data={{ row }} />
        </Box>
      </Box>
    </>
  );
};

const ActionCell = ({ data }: { data: any }) => {
  const theme = useTheme();
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [errorBarOpen, setErrorBarOpen] = useState<boolean>(false);
  const [successBarOpen, setSuccessBarOpen] = useState<boolean>(false);
  const [errorMsgs, setErrorMsgs] = useState<string>("");

  const { mutate: deleteArtistSong } = useDeleteArtistSong(
    data?.row?.original?.id
  );

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    const deleteId = data.row.original.id;
    deleteArtistSong(deleteId, {
      onSuccess: () => {
        setConfirmOpen(false);
        setSuccessBarOpen(true);
        setSuccessMsgs("Song deleted Successful!");
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          setErrorMsgs(
            error.response.data.message
              ? error.response.data.message
              : `Error Occured while deleting song.`
          );
          setErrorBarOpen(true);
        }
      },
    });
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
        <SuccessBar
          snackbarOpen={successBarOpen}
          setSnackbarOpen={setSuccessBarOpen}
          message={successMsgs}
        />
        <ErrorBar
          snackbarOpen={errorBarOpen}
          setSnackbarOpen={setErrorBarOpen}
          message={errorMsgs}
        />

        <Modal open={confirmOpen} onClose={handleConfirmClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              bgcolor: "background.paper",
              borderRadius: "8px",
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Confirmation
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Are you sure you want to Delete
              <Typography sx={{ fontWeight: 500 }}>
                {data.row.original.symbol}?
              </Typography>
            </Typography>
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
            >
              <Button
                sx={{
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    //   bgcolor: theme.palette.primary.mediumColor,
                  },
                }}
                variant="outlined"
                onClick={handleConfirmClose}
              >
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleConfirmDelete()}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>

        <Box
          onClick={handleDelete}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.2,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <DeleteIcon color="error" sx={{ fontSize: "14px" }} />
          <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
            Delete
          </Typography>
        </Box>
      </Box>
    </>
  );
};
