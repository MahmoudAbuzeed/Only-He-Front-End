import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app.hooks";
import {
  fetchProducts,
  addNewProduct,
  updateProduct,
  deleteProduct,
} from "./actions";
import { fetchCategories } from "../Categories/actions";
import Slide from "@material-ui/core/Slide";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: any;
  quantity: number;
  customer_price: number;
  original_price: number;
  offer: number;
}

const ProductsComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.data);
  const categories = useAppSelector((state) => state.categories.data);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>({
    id: 1,
    name: "",
    price: 1,
    description: "",
    category: "",
    quantity: 1,
    customer_price: 1,
    original_price: 1,
    offer: 1,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const productsWithDisplayId = products.map((product: any, index) => ({
    ...product,
    displayId: index + 1,
  }));

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "description", headerName: "Description", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "price", headerName: "Price", type: "number", width: 120 },
    { field: "customer_price", headerName: "Customer Price", width: 120 },
    { field: "offer", headerName: "Offer", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const onClickEdit = () => {
          setDialogType("Edit");
          setSelectedProduct(params.row as Product);
          setOpenDialog(true);
        };

        const onClickDelete = () => {
          dispatch(deleteProduct(params.row.id as number));
        };

        return (
          <Grid container justifyContent="flex-end" spacing={isMobile ? 1 : 2}>
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
    setSelectedProduct({
      id: 1,
      name: "",
      price: 1,
      description: "",
      category: "",
      quantity: 1,
      customer_price: 1,
      original_price: 1,
      offer: 1,
    });
  };

  const handleSave = () => {
    if (dialogType === "Add" && selectedProduct) {
      const category: any = categories.find(
        (category: any) => category.name === selectedProduct.category
      );
      selectedProduct.category = category.id;
      dispatch(addNewProduct(selectedProduct));
    } else if (dialogType === "Edit" && selectedProduct) {
      dispatch(updateProduct(selectedProduct));
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
            Add New Product
          </Button>
        </Grid>
      </Grid>

      <div style={{ height: 600, width: "100%", margin: "20px 0" }}>
        <DataGrid autoHeight rows={productsWithDisplayId} columns={columns} />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <DialogTitle>{`${dialogType} Product`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={selectedProduct?.name || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                name: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            value={selectedProduct?.description || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                description: e.target.value,
              })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={selectedProduct?.category || ""}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct!,
                  category: e.target.value,
                })
              }
            >
              {/* Assuming categories is an array in your state and has an id and name property */}
              {categories.map((category: any) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={selectedProduct?.quantity || 1}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                quantity: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={selectedProduct?.price || 1}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                price: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            id="customerPrice"
            label="Customer Price"
            type="number"
            fullWidth
            value={selectedProduct?.customer_price || 1}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                customer_price: parseFloat(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            id="originalPrice"
            label="Original Price"
            type="number"
            fullWidth
            value={selectedProduct?.original_price || 1}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                original_price: parseFloat(e.target.value),
              })
            }
          />

          <TextField
            margin="dense"
            id="offer"
            label="Offer"
            type="number"
            fullWidth
            value={selectedProduct?.offer || 1}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                offer: parseFloat(e.target.value),
              })
            }
          />
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

export default ProductsComponent;
