import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
// import { useAuth } from "../../store/authContext";
import { User, UserRole } from "../../types/user";
import { ROLES } from "../../constants/roles";
import UserForm from "./UserForm";
import { PaginationState } from "@tanstack/react-table";
import CustomTable from "../../components/Table/CustomTable";
import { UserTableListEntryHeader } from "../../constants/User/UserTableHeader";

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
  const theme = useTheme();
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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [next, setNext] = useState<boolean>(false);
  const [prev, setPrev] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);

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

  const totalPageCount = Math.ceil(users.length / pageSize);

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
          Users Management
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "1200px",
          // width: { md: "100%", lg: "120%", xl: "125%" },
          width: "90%",
        }}
      >
        <CustomTable
          columns={UserTableListEntryHeader}
          data={users}
          pagination={pagination}
          setPagination={setPagination}
          next={next}
          prev={prev}
          pageCount={totalPageCount}
          setPageSize={setPageSize}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default UsersList;
