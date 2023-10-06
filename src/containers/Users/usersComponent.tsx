import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

interface User {
  id: number;
  name: string;
  role: "Admin" | "User";
  permissions: string[];
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    role: "Admin",
    permissions: ["read", "write"],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "User",
    permissions: ["read"],
  },
];
const UsersComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "role", headerName: "Role", width: 120 },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 200,
      valueGetter: (params) => params.value.join(", "),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const onClickEdit = () => {
          setDialogType("Edit");
          setSelectedUser(params.row as User);
          setOpenDialog(true);
        };

        const onClickDelete = () => {
          setUsers((prev) => prev.filter((user) => user.id !== params.row.id));
        };

        return (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="primary" onClick={onClickEdit}>
              Edit
            </Button>
            <Button color="secondary" onClick={onClickDelete}>
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSave = () => {
    // Handle add/edit logic here
    if (dialogType === "Add") {
      // Add new user
    } else if (dialogType === "Edit" && selectedUser) {
      // Edit existing user
    }
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <div
        style={{ display: "flex", justifyContent: "flex-end", margin: "1rem" }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDialogType("Add");
            setOpenDialog(true);
          }}
        >
          Add New User
        </Button>
      </div>

      <div style={{ height: 600, width: "100%", margin: "20px" }}>
        <DataGrid<any> rows={users} columns={columns} />
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{`${dialogType} User`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={selectedUser?.name || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser!, name: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select
              value={selectedUser?.role || ""}
              onChange={(e) =>
                setSelectedUser({
                  ...selectedUser!,
                  role: e.target.value as "Admin" | "User",
                })
              }
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          {/* You can add other fields like permissions here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UsersComponent;
