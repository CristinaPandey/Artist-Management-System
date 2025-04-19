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
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSongDialog from "../../components/Dialogs/AddSongDialog";
import CustomTable from "../../components/Table/CustomTable";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { PaginationState } from "@tanstack/react-table";
import SongEntry from "./SongForm";
import { SongsTableListEntryHeader } from "../../constants/Songs/SongsTableHeader";
// import AddSongDialog from "../Dialogs/AddSongDialog";
// import { useAuth } from "../../contexts/AuthContext";

export interface Song {
  id: number;
  title: string;
  genre: string;
  release_date: string;
  artist_id: number;
}

const SongsList: React.FC = () => {
  const theme = useTheme();
  const { artistId } = useParams<{ artistId: string }>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [editSong, setEditSong] = useState<Song | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  //   const { user } = useAuth();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [next, setNext] = useState<boolean>(false);
  const [prev, setPrev] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSongs();
  }, [currentPage, rowsPerPage]);

  const fetchSongs = async () => {
    // try {
    //   setLoading(true);
    //   const response = await fetch(
    //     `/api/artists/${artistId}/songs?page=${page}&limit=${songsPerPage}`
    //   );
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const SongsData: Song[] = [
        {
          id: 1,
          title: "Bohemian Rhapsody",
          genre: "Rock",
          release_date: "1975-10-31",
          artist_id: 1,
        },
        {
          id: 2,
          title: "Shape of You",
          genre: "Pop",
          release_date: "2017-01-06",
          artist_id: 2,
        },
        {
          id: 3,
          title: "Blinding Lights",
          genre: "Synth-pop",
          release_date: "2019-11-29",
          artist_id: 3,
        },
        {
          id: 4,
          title: "Rolling in the Deep",
          genre: "Soul",
          release_date: "2010-11-29",
          artist_id: 4,
        },
        {
          id: 5,
          title: "Uptown Funk",
          genre: "Funk",
          release_date: "2014-11-10",
          artist_id: 5,
        },
        {
          id: 6,
          title: "Despacito",
          genre: "Reggaeton",
          release_date: "2017-01-12",
          artist_id: 6,
        },
        {
          id: 7,
          title: "Someone Like You",
          genre: "Pop",
          release_date: "2011-01-24",
          artist_id: 7,
        },
        {
          id: 8,
          title: "Take On Me",
          genre: "Synth-pop",
          release_date: "1984-04-16",
          artist_id: 8,
        },
        {
          id: 9,
          title: "Sweet Child O' Mine",
          genre: "Rock",
          release_date: "1987-08-17",
          artist_id: 9,
        },
        {
          id: 10,
          title: "Billie Jean",
          genre: "Pop",
          release_date: "1983-01-02",
          artist_id: 10,
        },
      ];
      setSongs(SongsData);

      //   if (!response.ok) {
      //     throw new Error("Failed to fetch songs");
      //   }

      //   const data = await response.json();
      //   //   setSongs(data.songs);
      //   setTotalPages(Math.ceil(data.total / songsPerPage));
      //   setLoading(false);
      // } catch (err) {
      //   setError("Error fetching songs. Please try again.");
      //   setLoading(false);
      // }
    } catch (error) {
      setError("Failed to fetch users");
      //   setOpenError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Songs fetched:", songs);
  }, [songs]);

  //   useEffect(() => {
  //     if (artistId) {
  //       fetchSongs(currentPage);
  //     }
  //   }, [artistId, currentPage, rowsPerPage]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const totalPageCount = Math.ceil(songs.length / pageSize);

  const handleDelete = async (songId: number) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        const response = await fetch(`/api/songs/${songId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete song");
        }

        // Refresh songs list
        // fetchSongs(currentPage);
      } catch (err) {
        setError("Error deleting song. Please try again.");
      }
    }
  };

  const handleEdit = (song: Song) => {
    setEditSong(song);
    setIsAddDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsAddDialogOpen(false);
    setEditSong(null);
  };

  const handleSongAdded = () => {
    // fetchSongs(currentPage);
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

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", m: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {songs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography>No songs found for this artist.</Typography>
            </Paper>
          ) : (
            <CustomTable
              columns={SongsTableListEntryHeader}
              data={songs}
              pagination={pagination}
              setPagination={setPagination}
              next={next}
              prev={prev}
              pageCount={totalPageCount}
              setPageSize={setPageSize}
              loading={loading}
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
