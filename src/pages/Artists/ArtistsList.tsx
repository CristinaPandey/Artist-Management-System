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

const ArtistsList: React.FC = () => {
  //   const { hasPermission } = useAuth();
  const navigate = useNavigate();

  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [artistToDelete, setArtistToDelete] = useState<number | null>(null);

  const [openImportExport, setOpenImportExport] = useState<boolean>(false);

  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentArtist(null);
  };

  const handleDeleteArtist = (id: number) => {
    setArtistToDelete(id);
    setOpenConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (artistToDelete) {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update UI
        const updatedArtists = artists.filter(
          (artist) => artist.id !== artistToDelete
        );
        setArtists(updatedArtists);
        setSuccessMessage("Artist deleted successfully");
        setOpenSuccess(true);
      } catch (error) {
        setErrorMessage("Failed to delete artist");
        setOpenError(true);
      } finally {
        setOpenConfirmDialog(false);
        setArtistToDelete(null);
      }
    }
  };

  const handleSaveArtist = async (artist: Artist) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (isEdit && currentArtist) {
        // Update existing artist
        const updatedArtists = artists.map((a) =>
          a.id === currentArtist.id ? { ...a, ...artist } : a
        );
        setArtists(updatedArtists);
        setSuccessMessage("Artist updated successfully");
      } else {
        // Create new artist
        const newArtist: Artist = {
          ...artist,
          id: Math.max(...artists.map((a) => a.id), 0) + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setArtists([...artists, newArtist]);
        setSuccessMessage("Artist created successfully");
      }

      setOpenSuccess(true);
      handleCloseDialog();
    } catch (error) {
      setErrorMessage("Failed to save artist");
      setOpenError(true);
    }
  };

  const navigateToSongs = (artistId: number) => {
    navigate(`/artists/${artistId}/songs`);
  };

  // const columns: Column[] = [
  //   { id: "id", label: "ID", minWidth: 50 },
  //   { id: "name", label: "Name", minWidth: 150 },
  //   { id: "genre", label: "Genre", minWidth: 120 },

  //   {
  //     id: "actions",
  //     label: "Actions",
  //     minWidth: 200,
  //     format: (_, row) => (
  //       <Box sx={{ display: "flex", gap: 1 }}>
  //         <>
  //           <Tooltip title="Edit">
  //             <IconButton
  //               size="small"
  //               color="primary"
  //               onClick={() => handleOpenDialog(row as Artist)}
  //             >
  //               <EditIcon />
  //             </IconButton>
  //           </Tooltip>
  //           <Tooltip title="Delete">
  //             <IconButton
  //               size="small"
  //               color="error"
  //               onClick={() => handleDeleteArtist((row as Artist).id)}
  //             >
  //               <DeleteIcon />
  //             </IconButton>
  //           </Tooltip>
  //         </>
  //         <Tooltip title="View Songs">
  //           <IconButton
  //             size="small"
  //             color="secondary"
  //             onClick={() => navigateToSongs((row as Artist).id)}
  //           >
  //             <MusicNoteIcon />
  //           </IconButton>
  //         </Tooltip>
  //       </Box>
  //     ),
  //   },
  // ];

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
        <Typography variant="h4" component="h1">
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Artist
          </Button>
          {/* )} */}
        </Box>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <CustomTable
          columns={columns}
          data={artists}
          totalItems={artists.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          loading={loading}
        /> */}
      </Paper>

      {openDialog && (
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
      />

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
