import { ColumnDef } from "@tanstack/react-table";
import { User } from "../../types";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import ErrorBar from "../../components/Snackbar/ErrorBar";
import SuccessBar from "../../components/Snackbar/SuccessBar";
import DeleteIcon from "@mui/icons-material/Delete";
import EditStockModal from "../../pages/Users/EditModal";

export const UserTableListEntryHeader: ColumnDef<User>[] = [
  {
    header: "SN",
    accessorKey: "sn",
    cell: (data) => {
      return (
        <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
          {data?.row?.index + 1}
        </Typography>
      );
    },
  },
  {
    header: "Username",
    accessorKey: "username",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.username}
        </Typography>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: (data) => {
      return (
        <Typography
          sx={{ fontSize: "14px", fontWeight: 400, textAlign: "left" }}
        >
          {data?.row?.original?.email}
        </Typography>
      );
    },
  },
  {
    header: "Role ",
    accessorKey: "role",
    cell: (data) => {
      return (
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 400,
            textAlign: "left",
            textTransform: "capitalize",
          }}
        >
          {data?.row?.original?.role}
        </Typography>
      );
    },
  },

  {
    header: "Actions",
    accessorKey: "actions",
    cell: (data) => {
      //   const theme = useTheme();
      //   const [editOpen, setEditOpen] = useState<boolean>(false);

      const handleEdit = () => {
        // setEditOpen(true);
      };

      const handleSave = (updatedData: User) => {};

      return (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {/* <EditStockModal
              open={editOpen}
              setOpen={setEditOpen}
              data={data.row.original}
              onSave={handleSave}
            /> */}

            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Box
                onClick={handleEdit}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.2,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Edit
                  sx={{
                    fontSize: "16px",
                    // color: theme.palette.grey[900],
                    // "&:hover": {
                    //   color: theme.palette.grey[900],
                    // },
                  }}
                />
                <Typography
                  fontSize="13px"
                  fontWeight={600}
                  sx={{ userSelect: "none" }}
                >
                  Edit
                </Typography>
              </Box>
              <ActionCell data={data} />
            </Box>
          </Box>
        </>
      );
    },
  },
];

const ActionCell = ({ data }: { data: any }) => {
  const theme = useTheme();
  const [successMsgs, setSuccessMsgs] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [errorBarOpen, setErrorBarOpen] = useState<boolean>(false);
  const [successBarOpen, setSuccessBarOpen] = useState<boolean>(false);

  // const { mutate: deleteStockSetup } = useDeleteStockDetails(
  //   data?.row?.original?.id
  // );

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {};

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
        <SuccessBar
          snackbarOpen={successBarOpen}
          setSnackbarOpen={setSuccessBarOpen}
          message={successMsgs}
        />
        <ErrorBar
          snackbarOpen={errorBarOpen}
          setSnackbarOpen={setErrorBarOpen}
          message="Failed to delete"
        />

        <Modal open={confirmOpen} onClose={handleConfirmClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              bgcolor: "background.paper",
              borderRadius: "8px",
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="h2">
              Confirmation
            </Typography>
            <Typography sx={{ mt: 2 }}>
              Are you sure you want to Delete
              <Typography sx={{ fontWeight: 500 }}>
                {data.row.original.symbol}?
              </Typography>
            </Typography>
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
            >
              <Button
                sx={{
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    //   bgcolor: theme.palette.primary.mediumColor,
                  },
                }}
                variant="outlined"
                onClick={handleConfirmClose}
              >
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleConfirmDelete()}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>

        <Box
          onClick={handleDelete}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0.2,
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          <DeleteIcon color="error" sx={{ fontSize: "14px" }} />
          <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
            Delete
          </Typography>
        </Box>
      </Box>
    </>
  );
};
