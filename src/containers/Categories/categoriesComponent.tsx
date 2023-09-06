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
} from "@material-ui/core";

interface Category {
  id: number;
  name: string;
  image: File | string;
}

const CategoriesComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Electronics", image: "https://picsum.photos/200" },
    { id: 2, name: "Books", image: "https://picsum.photos/200" },
    { id: 4, name: "Clothing", image: "https://picsum.photos/200" },
    { id: 5, name: "Clothing", image: "https://picsum.photos/200" },
    { id: 6, name: "Clothing", image: "https://picsum.photos/200" },
    { id: 7, name: "Clothing", image: "https://picsum.photos/200" },
    { id: 8, name: "Clothing", image: "https://picsum.photos/200" },
    { id: 9, name: "Clothing", image: "https://picsum.photos/200" },
    { id: 10, name: "Clothing", image: "https://picsum.photos/200" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setSelectedCategory({
        ...selectedCategory!,
        image: file,
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Category Name", width: 400 },
    { field: "image", headerName: "Category Image", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const onClickEdit = () => {
          setDialogType("Edit");
          setSelectedCategory(params.row as Category);
          setOpenDialog(true);
        };

        const onClickDelete = () => {
          setCategories((prev) =>
            prev.filter((category) => category.id !== params.row.id)
          );
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
    setSelectedCategory(null);
  };

  const handleSave = () => {
    // Handle add/edit logic here, e.g., updating the categories state
    if (dialogType === "Add") {
      // Add new category
    } else if (dialogType === "Edit" && selectedCategory) {
      // Edit existing category
    }
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setDialogType("Add");
            setOpenDialog(true);
          }}
        >
          Add New Category
        </Button>
      </div>

      <div style={{ height: 600, width: "100%", margin: "20px" }}>
        <DataGrid<any> rows={categories} columns={columns} />
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{`${dialogType} Category`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            value={selectedCategory?.name || ""}
            onChange={(e) =>
              setSelectedCategory({
                ...selectedCategory!,
                name: e.target.value,
              })
            }
          />
          <input
            accept="image/*"
            style={{ display: "none",}}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
           {'         '}{uploadedImage?.name}
          </label>
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

export default CategoriesComponent;
