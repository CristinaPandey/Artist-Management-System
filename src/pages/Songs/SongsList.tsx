import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Alert,
  useTheme,
  CircularProgress,
  Paper,
} from "@mui/material";
import AddSongDialog from "../../components/Dialogs/AddSongDialog";
import CustomTable from "../../components/Table/CustomTable";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { PaginationState } from "@tanstack/react-table";
import SongEntry from "./SongForm";
import { SongsTableListEntryHeader } from "../../constants/Songs/SongsTableHeader";
import { useGetAllArtistSongList } from "../../services/Songs/SongServices";
// import AddSongDialog from "../Dialogs/AddSongDialog";
// import { useAuth } from "../../contexts/AuthContext";

export interface Song {
  id: number;
  title: string;
  genre: string;
  release_date: string;
  artist_id: number;
  album: string;
  duration: number;
}

const SongsList: React.FC = () => {
  const theme = useTheme();
  const { artistId } = useParams<{ artistId: string }>();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [editSong, setEditSong] = useState<Song | null>(null);
  //   const { user } = useAuth();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [openSuccess, setOpenSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [openError, setOpenError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setPage(pagination.pageIndex + 1);
    setPageSize(pagination.pageSize);
  }, [pagination]);

  const {
    data: artistSongList,
    isLoading,
    isError,
    error,
  } = useGetAllArtistSongList(page, pageSize);

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

  // const totalPageCount = Math.ceil(artistSongList.length / pageSize);

  const totalPages = artistSongList?.pagination?.pages || 1;
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

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setEditSong(null);
  };

  const handleSongAdded = () => {
    handleDialogClose();
  };

  //   const canModifySongs = user?.role === "artist";

  return (
    <Box sx={{ width: "100%", p: { xs: 2, sm: 3 } }}>
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
          Songs List
        </Typography>
        {/* {canModifySongs && ( */}
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
            Add New Song
          </Button>

          <SongEntry open={isModalOpen} onClose={handleCloseModal} />
        </Box>
        {/* )} */}
      </Box>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {artistSongList.songs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography>No songs found for this artist.</Typography>
            </Paper>
          ) : (
            <CustomTable
              columns={SongsTableListEntryHeader}
              data={artistSongList.songs || []}
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

      {isAddDialogOpen && (
        <AddSongDialog
          artistId={Number(artistId)}
          song={editSong}
          onClose={handleDialogClose}
          onSongAdded={handleSongAdded}
        />
      )}
    </Box>
  );
};

export default SongsList;
