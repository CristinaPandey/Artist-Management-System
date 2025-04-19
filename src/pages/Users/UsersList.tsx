// src/pages/Users/UsersList.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomTable, { Column } from "../../components/Table/CustomTable";
import RoundedButton from "../../components/Button/Button";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
// import { useAuth } from "../../store/authContext";
import { User, UserRole } from "../../types/user";
import { ROLES } from "../../constants/roles";
import UserForm from "./UserForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Form schema with proper conditional validation
const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().when("isEdit", {
    is: (isEdit: boolean) => !isEdit,
    then: (schema) =>
      schema
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    otherwise: (schema) => schema.optional(),
  }),
  role: yup.string().required("Role is required"),
  isEdit: yup.boolean().optional(),
});

// Type definition to match the schema
type UserFormData = {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  isEdit?: boolean;
};

const UsersList: React.FC = () => {
  //   const { hasPermission } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "artist" as UserRole,
      isEdit: false,
    },
  });

  useEffect(() => {
    fetchUsers();
  }, [page, rowsPerPage]);

  // Mock function to fetch users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUsers: User[] = [
        {
          id: 1,
          username: "admin",
          email: "admin@example.com",
          role: "super_admin" as UserRole,
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z",
        },
        {
          id: 2,
          username: "manager1",
          email: "manager1@example.com",
          role: "artist_manager" as UserRole,
          createdAt: "2023-01-02T00:00:00Z",
          updatedAt: "2023-01-02T00:00:00Z",
        },
        {
          id: 3,
          username: "artist1",
          email: "artist1@example.com",
          role: "artist" as UserRole,
          createdAt: "2023-01-03T00:00:00Z",
          updatedAt: "2023-01-03T00:00:00Z",
        },
        {
          id: 4,
          username: "artist2",
          email: "artist2@example.com",
          role: "artist" as UserRole,
          createdAt: "2023-01-04T00:00:00Z",
          updatedAt: "2023-01-04T00:00:00Z",
        },
      ];

      setUsers(mockUsers);
    } catch (error) {
      setErrorMessage("Failed to fetch users");
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setIsEdit(true);
      setCurrentUser(user);
      setValue("id", user.id);
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("role", user.role);
      setValue("isEdit", true);
    } else {
      setIsEdit(false);
      setCurrentUser(null);
      reset({
        username: "",
        email: "",
        password: "",
        role: "artist" as UserRole,
        isEdit: false,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    reset();
  };

  const handleCreateUser: SubmitHandler<UserFormData> = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEdit && currentUser) {
        // Update existing user
        const updatedUsers = users.map((user) =>
          user.id === currentUser.id ? { ...user, ...data } : user
        );
        setUsers(updatedUsers);
        setSuccessMessage("User updated successfully");
      } else {
        // Create new user
        const newUser: User = {
          id: Math.max(...users.map((u) => u.id), 0) + 1,
          username: data.username,
          email: data.email,
          role: data.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setUsers([...users, newUser]);
        setSuccessMessage("User created successfully");
      }

      setOpenSuccess(true);
      handleCloseDialog();
      fetchUsers(); // Refresh the list
    } catch (error) {
      setErrorMessage("Failed to save user");
      setOpenError(true);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUserToDelete(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const updatedUsers = users.filter((user) => user.id !== userToDelete);
        setUsers(updatedUsers);
        setSuccessMessage("User deleted successfully");
        setOpenSuccess(true);
      } catch (error) {
        setErrorMessage("Failed to delete user");
        setOpenError(true);
      } finally {
        setOpenConfirmDialog(false);
        setUserToDelete(null);
      }
    }
  };

  const columns: Column[] = [
    { id: "id", label: "ID", minWidth: 50 },
    { id: "username", label: "Username", minWidth: 100 },
    { id: "email", label: "Email", minWidth: 150 },
    { id: "role", label: "Role", minWidth: 100 },
    {
      id: "createdAt",
      label: "Created At",
      minWidth: 120,
      format: (value) => new Date(value).toLocaleDateString(),
    },
    {
      id: "actions",
      label: "Actions",
      minWidth: 150,
      align: "center" as const,
      format: (_: any, row: User) => (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          {/* <Button
            size="small"
            variant="contained"
            // color="primary"
            startIcon={<EditIcon onClick={() => handleEdit(row)} />}
            onClick={() => handleEdit(row)}
          ></Button> */}
          <EditIcon
            color="primary"
            onClick={() => handleOpenDialog(row)}
            sx={{ cursor: "pointer" }}
          />
          {/* <Button
            size="small"
            variant="contained"
            color="error"
            startIcon={
              <DeleteIcon color="error" onClick={() => handleDelete(row.id)} />
            }
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button> */}
          <DeleteIcon
            color="error"
            onClick={() => handleDeleteUser(row.id)}
            sx={{ cursor: "pointer" }}
          />
        </Box>
      ),
    },
  ];

  //   if (!hasPermission([ROLES.SUPER_ADMIN])) {
  //     return (
  //       <Box sx={{ p: 3 }}>
  //         <Typography variant="h6" color="error">
  //           Access Denied: You don't have permission to view this page.
  //         </Typography>
  //       </Box>
  //     );
  //   }

  return (
    <Box>
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

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Users Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add User
        </Button>
      </Box>

      <CustomTable
        columns={columns}
        data={users}
        totalItems={users.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        loading={loading}
        onEdit={(id) => handleOpenDialog(users.find((user) => user.id === id))}
        onDelete={handleDeleteUser}
      />

      {/* User Form Dialog */}

      {/* <UserForm onSubmit={handleCreateUser} onCancel={handleCloseDialog} /> */}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(handleCreateUser)}>
          <DialogTitle>
            {isEdit ? "Edit User" : "Add New User"}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}
            >
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    fullWidth
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    fullWidth
                  />
                )}
              />

              {!isEdit && (
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth
                    />
                  )}
                />
              )}

              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>Role</InputLabel>
                    <Select {...field} label="Role">
                      <MenuItem value={"super_admin" as UserRole}>
                        Super Admin
                      </MenuItem>
                      <MenuItem value={"artist_manager" as UserRole}>
                        Artist Manager
                      </MenuItem>
                      <MenuItem value={"artist" as UserRole}>Artist</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {isEdit ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersList;
