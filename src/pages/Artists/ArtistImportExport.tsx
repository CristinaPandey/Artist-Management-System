import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  FileDownload as DownloadIcon,
  Description as FileIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import {
  ImportResponse,
  useExportArtists,
  useImportArtists,
} from "../../services/Artists/ArtistServices";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import ErrorBar from "../../components/Snackbar/ErrorBar";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`artist-import-export-tabpanel-${index}`}
      aria-labelledby={`artist-import-export-tab-${index}`}
      {...other}
      style={{ padding: "16px 0" }}
    >
      {value === index && children}
    </div>
  );
};

interface ArtistImportExportProps {
  open: boolean;
  onClose: () => void;
}

const ArtistImportExport: React.FC<ArtistImportExportProps> = ({
  open,
  onClose,
}) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<ImportResponse | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMsgs, setErrorMsgs] = useState<string>("");
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [snackbarErrorOpen, setSnackbarErrorOpen] = useState<boolean>(false);
  const [snackbarSuccessOpen, setSnackbarSuccessOpen] =
    useState<boolean>(false);

  // Import/Export mutations
  const importArtistsMutation = useImportArtists();
  const exportArtistsMutation = useExportArtists();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    resetState();
  };

  const resetState = () => {
    setSelectedFile(null);
    setImportResult(null);
    setFileError(null);
    importArtistsMutation.reset();
    exportArtistsMutation.reset();

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
        setFileError("Please select a valid CSV file");
        importArtistsMutation.reset();
        return;
      }

      setSelectedFile(file);
      setImportResult(null);
      setFileError(null);
      importArtistsMutation.reset();
    }
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    try {
      const result = await importArtistsMutation.mutateAsync(selectedFile);
      setImportResult(result);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccessMsgs("Artists imported successfully!");
      setSnackbarSuccessOpen(true);
      onClose();
    } catch (error) {
      setErrorMsgs(
        error instanceof Error
          ? error.message
          : "Failed to import artists. Please try again."
      );
      setSnackbarErrorOpen(true);
    }
  };

  const handleExport = async () => {
    try {
      await exportArtistsMutation.mutateAsync();

      setSuccessMsgs(
        "Artists exported successfully! Your download should start shortly."
      );
      setSnackbarSuccessOpen(true);
      onClose();
    } catch (error) {
      setErrorMsgs(
        error instanceof Error
          ? error.message
          : "Failed to export artists. Please try again."
      );
      setSnackbarErrorOpen(true);
    }
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.palette.divider}`,
            pb: 1,
          }}
        >
          <Typography variant="h6" component="div">
            Artist Data Management
          </Typography>
          <IconButton aria-label="close" onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Import/Export tabs"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Import" id="artist-import-export-tab-0" />
            <Tab label="Export" id="artist-import-export-tab-1" />
          </Tabs>
        </Box>

        <DialogContent dividers>
          <TabPanel value={activeTab} index={0}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Upload a CSV file to import artists in bulk. The file should
                  contain the following columns:
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.grey[50],
                    borderRadius: 1,
                    fontFamily: "monospace",
                  }}
                >
                  <code>name,genre,country,formed_year,biography</code>
                </Paper>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      mr: 0.5,
                    }}
                  >
                    <InfoIcon fontSize="small" color="info" />
                  </Box>
                  Note: If an artist with the same name already exists, their
                  record will be updated.
                </Typography>
              </Box>

              <Divider />

              <Box>
                <input
                  type="file"
                  accept=".csv"
                  style={{ display: "none" }}
                  id="artist-csv-upload"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  disabled={importArtistsMutation.isPending}
                />

                <label htmlFor="artist-csv-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<UploadIcon />}
                    disabled={importArtistsMutation.isPending}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                    }}
                  >
                    Select CSV File
                  </Button>
                </label>

                {selectedFile && (
                  <Paper
                    sx={{
                      mt: 2,
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 2,
                    }}
                  >
                    <FileIcon
                      sx={{ mr: 1, color: theme.palette.primary.main }}
                    />
                    <Typography variant="body2">
                      {selectedFile.name} (
                      {(selectedFile.size / 1024).toFixed(1)} KB)
                    </Typography>
                  </Paper>
                )}

                {fileError && (
                  <Paper
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.palette.error.light,
                      color: theme.palette.error.contrastText,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <ErrorIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">{fileError}</Typography>
                    </Box>
                  </Paper>
                )}

                {importArtistsMutation.isError && (
                  <Paper
                    sx={{
                      mt: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.palette.error.light,
                      color: theme.palette.error.contrastText,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <ErrorIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {importArtistsMutation.error instanceof Error
                          ? importArtistsMutation.error.message
                          : "Failed to import artists"}
                      </Typography>
                    </Box>
                  </Paper>
                )}
              </Box>
            </Stack>
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Export all artists to a CSV file. This will download a file
                  containing all artist records with the following columns:
                </Typography>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.grey[50],
                    borderRadius: 1,
                    fontFamily: "monospace",
                  }}
                >
                  <code>
                    id,name,genre,country,formed_year,biography,created_at,updated_at
                  </code>
                </Paper>
              </Box>

              <Divider />

              <Box>
                {exportArtistsMutation.isError && (
                  <Paper
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 2,
                      bgcolor: theme.palette.error.light,
                      color: theme.palette.error.contrastText,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <ErrorIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {exportArtistsMutation.error instanceof Error
                          ? exportArtistsMutation.error.message
                          : "Failed to export artists"}
                      </Typography>
                    </Box>
                  </Paper>
                )}
              </Box>
            </Stack>
          </TabPanel>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>

          {activeTab === 0 && (
            <Button
              onClick={handleImport}
              variant="contained"
              color="primary"
              disabled={!selectedFile || importArtistsMutation.isPending}
              startIcon={
                importArtistsMutation.isPending ? (
                  <CircularProgress size={20} />
                ) : (
                  <UploadIcon />
                )
              }
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              {importArtistsMutation.isPending
                ? "Importing..."
                : "Import Artists"}
            </Button>
          )}

          {activeTab === 1 && (
            <Button
              onClick={handleExport}
              variant="contained"
              color="primary"
              disabled={exportArtistsMutation.isPending}
              startIcon={
                exportArtistsMutation.isPending ? (
                  <CircularProgress size={20} />
                ) : (
                  <DownloadIcon />
                )
              }
              sx={{
                borderRadius: 2,
                px: 3,
              }}
            >
              {exportArtistsMutation.isPending
                ? "Exporting..."
                : "Export to CSV"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <SuccessBar
        snackbarOpen={snackbarSuccessOpen}
        setSnackbarOpen={setSnackbarSuccessOpen}
        message={successMsgs}
      />
      <ErrorBar
        snackbarOpen={snackbarErrorOpen}
        setSnackbarOpen={setSnackbarErrorOpen}
        message={errorMsgs}
      />
    </>
  );
};

export default ArtistImportExport;
