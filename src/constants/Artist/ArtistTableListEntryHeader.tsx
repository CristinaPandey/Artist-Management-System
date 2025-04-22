import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
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
import { Artist } from "../../types/artist";
import {
  ArtistData,
  useDeleteArtist,
  usePutArtist,
  useUpdateArtist,
} from "../../services/Artists/ArtistServices";
import { isAxiosError } from "axios";
import RoundedButton from "../../components/Button/Button";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const ArtistTableListEntryHeader: ColumnDef<Artist>[] = [
  {
    header: " ID",
    accessorKey: "id",
    cell: (data) => {
      return (
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
          {data?.row?.id}
        </Typography>
      );
    },
  },
  {
    header: "Name",
    accessorKey: "name",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.name}
        </Typography>
      );
    },
  },
  {
    header: "Genre",
    accessorKey: "genre",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.genre}
        </Typography>
      );
    },
  },
  {
    header: "Formed Year",
    accessorKey: "formed_year",
    cell: (data) => {
      return (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          {data?.row?.original?.formed_year}
        </Typography>
      );
    },
  },
  {
    header: "Biography",
    accessorKey: "biography",
    cell: (data) => {
      return (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          {data?.row?.original?.biography}
        </Typography>
      );
    },
  },

  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => <ActionsCellEdit row={row} />,
  },
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
  const { mutate: updateUser } = useUpdateArtist(row.original.id);

  const schema = yup
    .object()
    .shape({
      name: yup.string().required().label("Artist Name"),
      genre: yup.string().required().label("Genre"),
      biography: yup.string().required().label("Biography"),
      formed_year: yup.string().required("Formed Year  is required"),

      country: yup.string().required().label("Country"),
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
  } = useForm<ArtistData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: row.original.name,
      genre: row.original.genre,
      biography: row.original.biography,
      formed_year: row.original.formed_year,
      country: row.original.country,
    },
  });

  useEffect(() => {
    if (editOpen) {
      reset({
        name: row.original.name || "",
        genre: row.original.genre || "",
        biography: row.original.biography,
        formed_year: row.original.formed_year,
        country: row.original.country,
      });
    }
  }, [editOpen, reset, row.original]);

  const handleEdit = () => setEditOpen(true);
  const handleClose = () => setEditOpen(false);

  const onSubmitSave = (formData: ArtistData) => {
    const formedYearFormatted = formData.formed_year
      ? new Date(formData.formed_year).getFullYear().toString()
      : "";
    const payload = {
      name: formData?.name,
      genre: formData?.genre,
      biography: formData?.biography,
      formed_year: formedYearFormatted,
      country: formData?.country,
    };

    updateUser(payload, {
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
              onSubmit={handleSubmit(onSubmitSave)}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              <Box display="flex" gap={2}>
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
                        placeholder="Please Enter Genre"
                        error={Boolean(errors.genre)}
                        helperText={errors.genre && errors.genre.message}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Formed Year</InputLabel>
                  <Controller
                    name="formed_year"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          view="year"
                          disableFuture
                          sx={{ width: "300px" }}
                          // value={field.value}
                          // {...field}
                          onChange={(newValue: any) => field.onChange(newValue)}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              size: "small",
                              error: !!errors.formed_year,
                              helperText: errors.formed_year?.message,
                              InputProps: {
                                startAdornment: (
                                  <InputAdornment position="start"></InputAdornment>
                                ),
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </Box>

                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Country</InputLabel>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ width: "300px" }}
                        {...field}
                        fullWidth
                        size="small"
                        placeholder="Please Enter Country"
                        error={Boolean(errors.country)}
                        helperText={errors.country && errors.country.message}
                      />
                    )}
                  />
                </Box>
              </Box>
              <Box>
                <InputLabel sx={{ fontWeight: 600 }}>Biography</InputLabel>
                <Controller
                  name="biography"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={4}
                      fullWidth
                      size="small"
                      placeholder="Please Enter Biography"
                      error={Boolean(errors.biography)}
                      helperText={errors.biography && errors.biography.message}
                    />
                  )}
                />
              </Box>

              <RoundedButton title1="Update User Entry" />
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
            <Edit
              sx={{
                fontSize: "16px",
                // color: theme.palette.grey[900],
                // "&:hover": {
                //   color: theme.palette.grey[900],
                // },
              }}
            />
            <Typography
              fontSize="13px"
              fontWeight={600}
              sx={{ userSelect: "none" }}
            >
              Edit
            </Typography>
          </Box>
          <ActionCell data={row} />
        </Box>
      </Box>
    </>
  );
};
//   const theme = useTheme();
//   const [editOpen, setEditOpen] = useState<boolean>(false);

const ActionCell = ({ data }: { data: any }) => {
  const theme = useTheme();
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [errorBarOpen, setErrorBarOpen] = useState<boolean>(false);
  const [successBarOpen, setSuccessBarOpen] = useState<boolean>(false);
  const [errorMsgs, setErrorMsgs] = useState<string>("");

  const artistId = data?.original?.id || data?.row?.original?.id;

  const { mutate: deleteArtist } = useDeleteArtist(artistId);

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    const deleteId = data?.row?.original?.id;
    deleteArtist(deleteId, {
      onSuccess: () => {
        setConfirmOpen(false);
        setSuccessBarOpen(true);
        setSuccessMsgs("Artist deleted Successful!");
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          setErrorMsgs(
            error.response.data.message
              ? error.response.data.message
              : `Error Occured while deleting artist.`
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
                {data?.row?.original?.symbol}
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
