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
import { useHistory } from "react-router";

interface Order {
  id: number;
  customer: string;
  products: string[];
  date: string;
  totalAmount: string;
}

const OrdersComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customer: "John Doe",
      products: ["Laptop", "Mouse"],
      date: "2023-10-01",
      totalAmount: "$1200",
    },
    {
      id: 2,
      customer: "Jane Smith",
      products: ["Headphones"],
      date: "2023-10-03",
      totalAmount: "$150",
    },
    {
      id: 3,
      customer: "Robert Brown",
      products: ["Laptop", "Headphones", "Mouse"],
      date: "2023-10-04",
      totalAmount: "$1350",
    },
    // ... you can add more dummy orders as needed
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const history = useHistory();

  const [openDialog, setOpenDialog] = useState(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "Order ID", width: 200 },
    { field: "customer", headerName: "Customer Name", width: 300 },
    { field: "products", headerName: "Products", width: 400 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "totalAmount", headerName: "Total Amount", width: 200 },
    //... you can add more columns as needed
  ];

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleSave = () => {
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
          onClick={() => setOpenDialog(true)}
        >
          Add New Order
        </Button>
      </div>

      <div style={{ height: 600, width: "100%", margin: "20px" }}>
        <DataGrid<any>
          rows={orders}
          columns={columns}
          onRowClick={(param) => history.push(`/order/${param.row.id}`)}
        />
      </div>

      {/* Dialog for Adding a New Order */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="customer"
            label="Customer Name"
            type="text"
            fullWidth
            value={selectedOrder?.customer || ""}
            onChange={(e) =>
              setSelectedOrder({
                ...selectedOrder!,
                customer: e.target.value,
              })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Products</InputLabel>
            <Select
              multiple
              value={selectedOrder?.products || []}
              onChange={(e) =>
                setSelectedOrder({
                  ...selectedOrder!,
                  products: e.target.value as string[],
                })
              }
            >
              {/* For simplicity, hardcoded list. In reality, you should fetch from an API */}
              <MenuItem value={"Laptop"}>Laptop</MenuItem>
              <MenuItem value={"Headphones"}>Headphones</MenuItem>
              <MenuItem value={"Mouse"}>Mouse</MenuItem>
            </Select>
          </FormControl>
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

export default OrdersComponent;
