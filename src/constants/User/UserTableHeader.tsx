import { ColumnDef } from "@tanstack/react-table";
import { User, UserRole } from "../../types";
import {
  Box,
  Button,
  IconButton,
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
import EditStockModal from "../../pages/Users/EditModal";
import {
  useDeleteUser,
  useUpdateUser,
} from "../../services/Users/UsersServices";
import { isAxiosError } from "axios";
import { ROLES } from "../roles";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RoundedButton from "../../components/Button/Button";
import CloseIcon from "@mui/icons-material/Close";

export const UserTableListEntryHeader: ColumnDef<User>[] = [
  {
    header: "ID",
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
    header: "Username",
    accessorKey: "username",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.username}
        </Typography>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.email}
        </Typography>
      );
    },
  },
  {
    header: "Role ",
    accessorKey: "role",
    cell: (data) => {
      return (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "left",
            textTransform: "capitalize",
            width: "max-content",
          }}
        >
          {data?.row?.original?.role === "super_admin"
            ? "Super Admin"
            : data?.row?.original?.role === "artist_manager"
            ? "Artist Manager"
            : data?.row?.original?.role === "artist"
            ? "Artist"
            : data?.row?.original?.role}
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
  const { mutate: updateUser } = useUpdateUser(row.original.id);

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
    role: yup
      .mixed<UserRole>()
      .oneOf(Object.values(ROLES))
      .required("Role is required"),
  });

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

  interface ExtendedRegisterData {
    username: string;
    email: string;
    password: string;
    role: UserRole;
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExtendedRegisterData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: row.original.username || "",
      email: row.original.email || "",
      password: row.original.password,
      role: row.original.role || ROLES.ARTIST_MANAGER,
    },
  });

  useEffect(() => {
    if (editOpen) {
      reset({
        username: row.original.username || "",
        email: row.original.email || "",
        password: "",
        role: row.original.role || ROLES.ARTIST_MANAGER,
      });
    }
  }, [editOpen, reset, row.original]);

  const handleEdit = () => setEditOpen(true);
  const handleClose = () => setEditOpen(false);

  const onSubmitSave = (formData: ExtendedRegisterData) => {
    const payload = {
      username: formData.username,
      email: formData.email,
      role: formData.role,
      ...(formData.password && { password: formData.password }),
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
                  <InputLabel sx={{ fontWeight: 600 }}>Username</InputLabel>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        placeholder="Enter Username"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        sx={{ width: "300px" }}
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
                        {...field}
                        size="small"
                        placeholder="Enter Email"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{ width: "300px" }}
                      />
                    )}
                  />
                </Box>
              </Box>

              <Box display="flex" gap={2}>
                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Password</InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        size="small"
                        type="password"
                        placeholder="Enter New Password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{ width: "300px" }}
                      />
                    )}
                  />
                </Box>

                <Box>
                  <InputLabel sx={{ fontWeight: 600 }}>Role</InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <Select {...field} size="small" sx={{ width: "300px" }}>
                        <MenuItem value={"super_admin"}>Super Admin</MenuItem>
                        <MenuItem value={"artist_manager"}>
                          Artist Manager
                        </MenuItem>
                        <MenuItem value={"artist"}>Artist</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <Typography color="error" fontSize="12px">
                      {errors.role.message}
                    </Typography>
                  )}
                </Box>
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

  const { mutate: deleteUser } = useDeleteUser(data?.row?.original?.id);

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    const deleteId = data.row.original.id;
    deleteUser(deleteId, {
      onSuccess: () => {
        setConfirmOpen(false);
        setSuccessBarOpen(true);
        setSuccessMsgs("User deleted Successful!");
      },
      onError: (error) => {
        if (isAxiosError(error) && error.response) {
          setErrorMsgs(
            error.response.data.message
              ? error.response.data.message
              : `Error Occured while deleting user.`
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
