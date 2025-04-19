import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SongForm from "../../pages/Songs/SongForm";

interface Song {
  id?: number;
  title: string;
  genre: string;
  release_date: string;
  artist_id?: number;
}

interface AddSongDialogProps {
  artistId: number;
  song: Song | null;
  onClose: () => void;
  onSongAdded: () => void;
}

const AddSongDialog: React.FC<AddSongDialogProps> = ({
  artistId,
  song,
  onClose,
  onSongAdded,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: {
    title: string;
    genre: string;
    release_date: string;
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const url = song?.id
        ? `/api/songs/${song.id}`
        : `/api/artists/${artistId}/songs`;

      const method = song?.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          artist_id: artistId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save song");
      }

      onSongAdded();
    } catch (err) {
      console.error("Error saving song:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
          p: 2,
        }}
      >
        {song?.id ? "Edit Song" : "Add New Song"}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ mt: 1 }}>
          {/* <SongForm
            // artistId={artistId}
            initialData={song || undefined}
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          /> */}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
