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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slide,
  Grid,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app.hooks";
import { fetchOrders, addNewOrder } from "./actions";
import { fetchProducts } from "../Products/actions";
import { useHistory } from "react-router";

interface Order {
  id: number;
  customer: string;
  products: string[];
  date: string;
  totalAmount: string;
  status?: string;
}

interface ProductQuantity {
  id: number;
  name: string;
  quantity: number;
}

const OrdersComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.data);
  const products = useAppSelector((state) => state.products.data);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"Add" | "Edit">("Add");

  const [productQuantities, setProductQuantities] = useState<ProductQuantity[]>(
    []
  );

  const history = useHistory();

  const ordersWithDisplayId = orders.map((order: any, index) => ({
    ...order,
    displayId: index + 1,
  }));

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: "displayId", headerName: "Order ID", width: 200 },
    { field: "user", headerName: "Customer Name", width: 200 },
    { field: "status", headerName: "Order Status", width: 200 },
    { field: "created_at", headerName: "Order Date", width: 200 },
    { field: "total_price", headerName: "Total Price EGP", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const onShowDetails = () => history.push(`/orders/${params.row.id}`);

        return (
          <Button color="primary" onClick={onShowDetails}>
            Show
          </Button>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };

  const handleSave = () => {
    if (selectedOrder) {
      const productsIds = selectedOrder.products.map((product) => {
        const productObj: any = products.find((p: any) => p.name === product);
        return productObj?.id;
      });
      selectedOrder.products = productsIds;
      selectedOrder.status = "PENDING";
      console.log({ selectedOrder });
      dispatch(addNewOrder(selectedOrder));
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
            Add New Order
          </Button>
        </Grid>{" "}
      </Grid>

      <div style={{ height: 600, width: "100%", margin: "20px 0" }}>
        <DataGrid autoHeight rows={ordersWithDisplayId} columns={columns} />
      </div>

      <Dialog
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Slide}
      >
        <DialogTitle>{`${dialogType} Order`}</DialogTitle>
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
            <InputLabel>Select Product</InputLabel>
            <Select
              value=""
              onChange={(e) => {
                const selectedProduct: any = products.find(
                  (p: any) => p.id === e.target.value
                );
                if (selectedProduct) {
                  const updatedQuantities = [...productQuantities];
                  if (
                    !updatedQuantities.some((p) => p.id === selectedProduct.id)
                  ) {
                    updatedQuantities.push({
                      id: selectedProduct.id,
                      name: selectedProduct.name,
                      quantity: 1,
                    });
                  }
                  setProductQuantities(updatedQuantities);
                }
              }}
            >
              {products.map((product: any) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {productQuantities.map((product, index) => (
            <div
              key={product.id}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <span style={{ flex: 1 }}>{product.name}</span>
              <Button
                onClick={() => {
                  const updatedQuantities = [...productQuantities];
                  const foundProduct = updatedQuantities[index];
                  if (foundProduct.quantity > 1) {
                    foundProduct.quantity -= 1;
                  } else {
                    updatedQuantities.splice(index, 1);
                  }
                  setProductQuantities(updatedQuantities);
                }}
              >
                -
              </Button>
              <span style={{ margin: "0 10px" }}>{product.quantity}</span>
              <Button
                onClick={() => {
                  const updatedQuantities = [...productQuantities];
                  updatedQuantities[index].quantity += 1;
                  setProductQuantities(updatedQuantities);
                }}
              >
                +
              </Button>
            </div>
          ))}
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
