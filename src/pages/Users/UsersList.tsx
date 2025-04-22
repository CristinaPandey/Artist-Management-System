import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
// import { useAuth } from "../../store/authContext";
import { User, UserRole } from "../../types/user";
import { PaginationState } from "@tanstack/react-table";
import CustomTable from "../../components/Table/CustomTable";
import { UserTableListEntryHeader } from "../../constants/User/UserTableHeader";
import UserEntry from "./UserEntry";
import { useGetAllUserList } from "../../services/Users/UsersServices";

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
  const [page, setPage] = useState<number>(0);
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {} = useForm<UserFormData>({
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
    setPage(pagination.pageIndex + 1);
    setPageSize(pagination.pageSize);
  }, [pagination]);

  const {
    data: userList,
    isLoading,
    isError,
    error,
  } = useGetAllUserList(page, pageSize);

  useEffect(() => {
    if (isError && error) {
      setErrorMessage("Failed to fetch users. Please try again.");
      setOpenError(true);
    }
  }, [isError, error]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = userList?.pagination?.pages || 1;
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 0,
    }));
  };

  return (
    <Box sx={{ width: "100%", p: { xs: 2, sm: 3 } }}>
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
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
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
        <Box sx={{ display: "flex", flexDirection: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: "100px",
              padding: "6px 24px",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
              textTransform: "none",
              backgroundColor: theme.palette.secondary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.main,
              },
            }}
            startIcon={<PersonAddIcon />}
            onClick={handleOpenModal}
          >
            Add New User
          </Button>

          <UserEntry open={isModalOpen} onClose={handleCloseModal} />
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {userList?.users.length === 0 ? (
            <CustomTable
              columns={UserTableListEntryHeader}
              data={userList || []}
            />
          ) : (
            <CustomTable
              columns={UserTableListEntryHeader}
              data={userList?.users || []}
              pagination={pagination}
              setPagination={setPagination}
              next={!hasNextPage}
              prev={!hasPrevPage}
              pageCount={totalPages}
              setPageSize={handlePageSizeChange}
              loading={isLoading}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default UsersList;
