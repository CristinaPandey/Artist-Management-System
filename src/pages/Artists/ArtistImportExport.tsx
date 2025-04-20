import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tabs,
  Tab,
  LinearProgress,
  Alert,
  IconButton,
  InputLabel,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Close as CloseIcon,
  FileUpload as FileUploadIcon,
  Download as DownloadIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import { Artist } from "../../types/artist";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface ArtistImportExportProps {
  open: boolean;
  onClose: () => void;
  onImportSuccess: () => void;
}

const ArtistImportExport: React.FC<ArtistImportExportProps> = ({
  open,
  onClose,
  onImportSuccess,
}) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    // Reset state when switching tabs
    setSelectedFile(null);
    setError(null);
    setSuccess(null);
    setProgress(0);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type !== "text/csv") {
        setError("Please select a CSV file");
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      setError("Please select a file to import");
      return;
    }

    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(null);

    try {
      // Simulate file upload with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        setProgress(i);
      }

      // Mock successful import
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSuccess("Artists imported successfully");
      setSelectedFile(null);

      // Reset file input
      const fileInput = document.getElementById(
        "csv-file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";

      onImportSuccess();
    } catch (error) {
      setError("Failed to import artists");
    } finally {
      setUploading(false);
    }
  };

  const handleExport = async () => {};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "19px",
          color: "#212121",
          width: "max-content",
        }}
      >
        Artist Import/Export
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label="Import" />
          <Tab label="Export" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Upload a CSV file to import artists in bulk. The file should
              contain the following columns:
            </Typography>
            <Box
              component="code"
              sx={{
                display: "block",
                p: 1,
                bgcolor: "grey.100",
                borderRadius: 1,
                mb: 2,
              }}
            >
              name,genre,country,formationYear
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <input
              accept=".csv"
              style={{ display: "none" }}
              id="csv-file-upload"
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <InputLabel htmlFor="csv-file-upload">
              <Button
                component="span"
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
                startIcon={<FileUploadIcon />}
                disabled={uploading}
              >
                Select CSV File
              </Button>
            </InputLabel>

            {selectedFile && (
              <Paper
                sx={{
                  p: 2,
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <DescriptionIcon color="primary" />
                <Typography>{selectedFile.name}</Typography>
              </Paper>
            )}
          </Box>

          {progress > 0 && progress < 100 && (
            <Box sx={{ width: "100%", mb: 2 }}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                {progress}%
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
              onClick={handleImport}
              disabled={!selectedFile || uploading}
              startIcon={<FileUploadIcon />}
            >
              Import
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              Export all artists to a CSV file. This will download a file
              containing all artist records.
            </Typography>
          </Box>

          {progress > 0 && progress < 100 && (
            <Box sx={{ width: "100%", mb: 2 }}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                Preparing download...
              </Typography>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
              onClick={handleExport}
              startIcon={<DownloadIcon />}
            >
              Export to CSV
            </Button>
          </Box>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistImportExport;
