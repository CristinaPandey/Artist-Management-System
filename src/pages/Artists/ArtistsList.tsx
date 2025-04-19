import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  MusicNote as MusicNoteIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import { Artist } from "../../types/artist";
import { ROLES } from "../../constants/roles";
// import AddArtistDialog from "../Dialogs/AddArtistDialog";
// import ConfirmDialog from "../../components/Dialog/ConfirmDialog";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";
import ArtistImportExport from "./ArtistImportExport";
import AddArtistDialog from "../../components/Dialogs/AddArtistDialog";
import ConfirmDialog from "../../components/Dialogs/ConfirmDialog";
import CustomTable from "../../components/Table/CustomTable";
import { ArtistTableListEntryHeader } from "../../constants/Artist/ArtistTableListEntryHeader";
import { PaginationState } from "@tanstack/react-table";

const ArtistsList: React.FC = () => {
  const theme = useTheme();
  //   const { hasPermission } = useAuth();
  const navigate = useNavigate();

  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [openImportExport, setOpenImportExport] = useState<boolean>(false);

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

  useEffect(() => {
    fetchArtists();
  }, [page, rowsPerPage]);

  const fetchArtists = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data
      const mockArtists: Artist[] = [
        {
          id: 1,
          name: "John Doe",
          genre: "Rock",
          //   country: "USA",
          //   formationYear: 2010,
          createdAt: "2023-01-01T00:00:00Z",
          updatedAt: "2023-01-01T00:00:00Z",
        },
        {
          id: 2,
          name: "Jane Smith",
          genre: "Pop",
          //   country: "UK",
          //   formationYear: 2015,
          createdAt: "2023-01-02T00:00:00Z",
          updatedAt: "2023-01-02T00:00:00Z",
        },
        {
          id: 3,
          name: "Band XYZ",
          genre: "Jazz",
          //   country: "France",
          //   formationYear: 2008,
          createdAt: "2023-01-03T00:00:00Z",
          updatedAt: "2023-01-03T00:00:00Z",
        },
      ];

      setArtists(mockArtists);
    } catch (error) {
      setErrorMessage("Failed to fetch artists");
      setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (artist?: Artist) => {
    if (artist) {
      setIsEdit(true);
      setCurrentArtist(artist);
    } else {
      setIsEdit(false);
      setCurrentArtist(null);
    }
    setOpenDialog(true);
  };

  const totalPageCount = Math.ceil(artists.length / pageSize);

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
          {/* {canImportExport && ( */}
          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={() => setOpenImportExport(true)}
          >
            Import/Export
          </Button>
          {/* )} */}
          {/* {canCreate && ( */}
          {/* <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Artist
          </Button> */}
          {/* )} */}
        </Box>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <CustomTable
          columns={ArtistTableListEntryHeader}
          data={artists}
          pagination={pagination}
          setPagination={setPagination}
          next={next}
          prev={prev}
          pageCount={totalPageCount}
          setPageSize={setPageSize}
          loading={loading}
        />
      </Paper>

      {/* {openDialog && (
        <AddArtistDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onSave={handleSaveArtist}
          artist={currentArtist}
          isEdit={isEdit}
        />
      )}

      <ConfirmDialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this artist? This action cannot be undone."
      /> */}

      {openImportExport && (
        <ArtistImportExport
          open={openImportExport}
          onClose={() => setOpenImportExport(false)}
          onImportSuccess={() => {
            fetchArtists();
            setSuccessMessage("Artists imported successfully");
            setOpenSuccess(true);
          }}
        />
      )}
    </Box>
  );
};

export default ArtistsList;
