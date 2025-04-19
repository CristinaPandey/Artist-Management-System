import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Artist } from "../../types/artist";

const currentYear = new Date().getFullYear();

const schema = yup.object().shape({
  name: yup.string().required("Artist name is required"),
  genre: yup.string().required("Genre is required"),
  country: yup.string().required("Country is required"),
  formationYear: yup
    .number()
    .typeError("Formation year must be a number")
    .integer("Formation year must be an integer")
    .min(1900, "Formation year must be after 1900")
    .max(currentYear, `Formation year cannot be after ${currentYear}`)
    .required("Formation year is required"),
});

interface ArtistFormProps {
  onSubmit: (data: Artist) => void;
  onCancel: () => void;
  initialData?: Artist;
  isEdit?: boolean;
}

const ArtistForm: React.FC<ArtistFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Artist>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: initialData?.name || "",
      genre: initialData?.genre || "",
    },
  });

  const onFormSubmit = (data: Artist) => {
    // If we're editing, preserve the ID
    if (isEdit && initialData?.id) {
      onSubmit({ ...data, id: initialData.id });
    } else {
      onSubmit(data);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {isEdit ? "Edit Artist" : "Create New Artist"}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Artist Name"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid>
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Genre"
                fullWidth
                error={!!errors.genre}
                helperText={errors.genre?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {isEdit ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default ArtistForm;
