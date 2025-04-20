import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Artist } from "../../types/artist";

interface AddArtistDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (artist: Artist) => void;
  artist?: Artist | null;
  isEdit?: boolean;
}

const AddArtistDialog: React.FC<AddArtistDialogProps> = ({
  open,
  onClose,
  onSave,
  artist,
  isEdit = false,
}) => {
  const [name, setName] = React.useState(artist?.name || "");
  const [genre, setGenre] = React.useState(artist?.genre || "");
  //   const [country, setCountry] = React.useState(artist?.country || "");
  //   const [formationYear, setFormationYear] = React.useState(
  //     artist?.formationYear || ""
  //   );

  const handleSave = () => {
    // const updatedArtist: Artist = {
    //   id: artist?.id || 0, // Will be overwritten if new artist
    //   name,
    //   genre,
    //   //   country,
    //   //   formationYear: Number(formationYear),
    //   createdAt: artist?.createdAt || new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
    // };
    // onSave(updatedArtist);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? "Edit Artist" : "Add New Artist"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            fullWidth
            margin="normal"
          /> */}
          {/* <TextField
            label="Formation Year"
            type="number"
            value={formationYear}
            onChange={(e) => setFormationYear(e.target.value)}
            fullWidth
            margin="normal"
          /> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddArtistDialog;
