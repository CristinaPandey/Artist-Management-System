import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import { Upload as UploadIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
import CustomTable from "../../components/Table/CustomTable";
import { ArtistTableListEntryHeader } from "../../constants/Artist/ArtistTableListEntryHeader";
import { PaginationState } from "@tanstack/react-table";
import ArtistEntry from "./ArtistForm";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useGetAllArtistList } from "../../services/Artists/ArtistServices";
import ArtistImportExport from "./ArtistImportExport";

const ArtistsList: React.FC = () => {
  const theme = useTheme();
  const [importExportOpen, setImportExportOpen] = useState(false);
  const [openImportExport, setOpenImportExport] = useState<boolean>(false);

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

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setPage(pagination.pageIndex + 1);
    setPageSize(pagination.pageSize);
  }, [pagination]);

  const {
    data: artistList,
    isLoading,
    isError,
    error,
  } = useGetAllArtistList(page, pageSize);

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

  const handleOpenImportExport = () => {
    setImportExportOpen(true);
  };

  const handleCloseImportExport = () => {
    setImportExportOpen(false);
  };

  const totalPages = artistList?.pagination?.pages || 1;
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

  // const totalPageCount = Math.ceil(artistList.length / pageSize);

  // Check access permission
  //   const canView = hasPermission([ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER]);
  //   const canCreate = hasPermission([ROLES.ARTIST_MANAGER]);
  //   const canImportExport = hasPermission([ROLES.ARTIST_MANAGER]);

  //   if (!canView) {
  //     return (
  //       <Box sx={{ p: 3 }}>
  //         <Typography variant="h6" color="error">
  //           Access Denied: You don't have permission to view this page.
  //         </Typography>
  //       </Box>
  //     );
  //   }

  return (
    <Box sx={{ p: 3 }}>
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
          mb: 3,
          alignItems: "center",
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
          Artists Management
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* {canCreate && ( */}
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
              Add New Artist
            </Button>

            <ArtistEntry open={isModalOpen} onClose={handleCloseModal} />
          </Box>
          {/* )} */}
          {/* {canImportExport && ( */}
          <Button
            variant="outlined"
            sx={{
              borderRadius: "100px",
              padding: "6px 24px",
              borderColor: "#616161",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
              color: theme.palette.secondary.main,
              textTransform: "none",
            }}
            startIcon={<UploadIcon />}
            // onClick={() => setOpenImportExport(true)}
            onClick={handleOpenImportExport}
          >
            Import/Export
          </Button>
          {/* )} */}
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {artistList?.artists.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography>No songs found for this artist.</Typography>
            </Paper>
          ) : (
            <CustomTable
              columns={ArtistTableListEntryHeader}
              data={artistList?.artists || []}
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

      <ArtistImportExport
        open={importExportOpen}
        onClose={handleCloseImportExport}
      />
    </Box>
  );
};

export default ArtistsList;
