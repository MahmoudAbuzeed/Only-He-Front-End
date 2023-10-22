import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  Slide,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app.hooks";
import {
  fetchCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
} from "./actions";

interface Category {
  id: number;
  name: string;
  image: File | string;
}

const CategoriesComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.data);
  const status = useAppSelector((state) => state.categories.status);
  console.log({ categories, status });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const categoriesWithDisplayId = categories.map((category: any, index) => ({
    ...category,
    displayId: index + 1, // Assigning sequential IDs starting from 1
  }));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
    { field: "displayId", headerName: "ID", width: 200 },
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
          dispatch(deleteCategory(params.row.id as number));
        };

        return (
          <Grid
            container
            justifyContent="flex-start"
            spacing={isMobile ? 1 : 2}
          >
            <Grid item>
              <Button color="primary" onClick={onClickEdit}>
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button color="secondary" onClick={onClickDelete}>
                Delete
              </Button>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedCategory(null);
  };

  const handleSave = () => {
    if (dialogType === "Add" && selectedCategory) {
      dispatch(addNewCategory(selectedCategory));
    } else if (dialogType === "Edit" && selectedCategory) {
      dispatch(updateCategory(selectedCategory));
    }
    handleClose();
  };

  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="flex-end" style={{ margin: "1rem 0" }}>
        <Grid item>
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
        </Grid>
      </Grid>

      <div style={{ height: 600, width: "100%", margin: "20px 0" }}>
        <DataGrid autoHeight rows={categoriesWithDisplayId} columns={columns} />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
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
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" color="primary" component="span">
              Upload Image
            </Button>
            {"    "}
            {uploadedImage?.name}
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
