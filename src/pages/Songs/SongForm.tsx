import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Grid, FormHelperText } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface SongFormProps {
  artistId: number;
  initialData?: {
    id?: number;
    title: string;
    genre: string;
    release_date: string;
  };
  onSubmit: (formData: FormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

interface FormData {
  title: string;
  genre: string;
  release_date: string;
}

interface FormErrors {
  title?: string;
  genre?: string;
  release_date?: string;
}

const SongForm: React.FC<SongFormProps> = ({
  artistId,
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "",
    genre: initialData?.genre || "",
    release_date: initialData?.release_date
      ? initialData.release_date.split("T")[0]
      : "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        genre: initialData.genre || "",
        release_date: initialData.release_date
          ? initialData.release_date.split("T")[0]
          : "",
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
    }

    if (!formData.release_date) {
      newErrors.release_date = "Release date is required";
    } else {
      const releaseDate = new Date(formData.release_date);
      const today = new Date();
      if (releaseDate > today) {
        newErrors.release_date = "Release date cannot be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for this field if it exists
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        release_date: formattedDate,
      }));

      if (errors.release_date) {
        setErrors((prev) => ({
          ...prev,
          release_date: undefined,
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid>
          <TextField
            name="title"
            label="Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid>
          <TextField
            name="genre"
            label="Genre"
            fullWidth
            value={formData.genre}
            onChange={handleChange}
            error={!!errors.genre}
            helperText={errors.genre}
            required
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Release Date"
              value={
                formData.release_date ? new Date(formData.release_date) : null
              }
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                  error: !!errors.release_date,
                },
              }}
              sx={{ mb: 1 }}
            />
          </LocalizationProvider>
          {errors.release_date && (
            <FormHelperText error>{errors.release_date}</FormHelperText>
          )}
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          variant="outlined"
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ width: { xs: "100%", sm: "auto" } }}
        >
          {isSubmitting
            ? "Saving..."
            : initialData?.id
            ? "Update Song"
            : "Add Song"}
        </Button>
      </Box>
    </Box>
  );
};

export default SongForm;
