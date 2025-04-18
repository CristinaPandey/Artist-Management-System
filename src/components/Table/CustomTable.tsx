// src/components/Table/CustomTable.tsx
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete, PlayArrow } from "@mui/icons-material";

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
}

interface CustomTableProps {
  columns: Column[];
  data: any[];
  totalItems: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onViewSongs?: (id: number) => void;
  showActions?: boolean;
  showViewSongs?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  totalItems,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading = false,
  onEdit,
  onDelete,
  onViewSongs,
  showActions = true,
  showViewSongs = false,
}) => {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ fontWeight: "bold" }}
                >
                  {column.label}
                </TableCell>
              ))}
              {showActions && (
                <TableCell
                  align="center"
                  sx={{ minWidth: 120, fontWeight: "bold" }}
                >
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  align="center"
                >
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : data.length > 0 ? (
              data.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    {showActions && (
                      <TableCell align="center">
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          {onEdit && (
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                onClick={() => onEdit(row.id)}
                                color="primary"
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {onDelete && (
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                onClick={() => onDelete(row.id)}
                                color="error"
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                          {showViewSongs && onViewSongs && (
                            <Tooltip title="View Songs">
                              <IconButton
                                size="small"
                                onClick={() => onViewSongs(row.id)}
                                color="secondary"
                              >
                                <PlayArrow fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  align="center"
                >
                  <Typography variant="body2" color="text.secondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default CustomTable;
