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

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  quantity: number;
  customerPrice: number;
  offer: number;
}

const ProductsComponent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 2,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 3,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 4,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 5,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 6,
      name: "test",
      price: 23,
      description: "test",
      customerPrice: 900,
      offer: 10,
      category: "test",
      quantity: 10,
    },
    {
      id: 7,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 8,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 9,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 10,
      name: "Laptop",
      price: 1000,
      description: "Laptop",
      customerPrice: 900,
      offer: 10,
      category: "Electronics",
      quantity: 10,
    },
    // Add more initial products here
  ]);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Name", width: 120 },
    { field: "description", headerName: "Description", width: 120 },
    { field: "category", headerName: "Category", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 120 },
    { field: "price", headerName: "Price", type: "number", width: 120 },
    { field: "customerPrice", headerName: "Customer Price", width: 120 },
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
          setProducts((prev) =>
            prev.filter((product) => product.id !== params.row.id)
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
    setSelectedProduct(null);
  };

  const handleSave = () => {
    // Handle add/edit logic here, e.g., updating the products state
    if (dialogType === "Add") {
      // Add new product
    } else if (dialogType === "Edit" && selectedProduct) {
      // Edit existing product
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
          Add New Product
        </Button>
      </div>

      <div style={{ height: 600, width: "100%", margin: "20px" }}>
        <DataGrid<any> rows={products} columns={columns} />
      </div>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleClose}>
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
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={selectedProduct?.category || ""}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                category: e.target.value,
              })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            value={selectedProduct?.quantity || 0}
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
            value={selectedProduct?.price || 0}
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
            value={selectedProduct?.customerPrice || 0}
            onChange={(e) =>
              setSelectedProduct({
                ...selectedProduct!,
                customerPrice: parseFloat(e.target.value),
              })
            }
          />

          <TextField
            margin="dense"
            id="offer"
            label="Offer"
            type="number"
            fullWidth
            value={selectedProduct?.offer || 0}
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
