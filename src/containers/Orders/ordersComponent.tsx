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
  Grow,
  makeStyles,
  InputLabel,
  Select,
  Paper,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app.hooks";
import { fetchOrders, addNewOrder } from "./actions";
import { fetchProducts } from "../Products/actions";
import { useHistory } from "react-router";
import {
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  dialog: {
    minWidth: "50%",
    minHeight: "50%",
  },
  title: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    textAlign: "center",
    padding: theme.spacing(2),
  },
  content: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    minWidth: 650,
  },
}));
const OrdersComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const classes = useStyles();

  const orders = useAppSelector((state) => state.orders.data);
  const products = useAppSelector((state) => state.products.data);
  const [dialogOrderItems, setDialogOrderItems] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(1);
  const [customer, setCustomer] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [openCreateOrderDialog, setOpenCreateOrderDialog] = useState(false);
  const [openAddNewProductDialog, setOpenAddNewProductDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const calculatedTotalPrice = dialogOrderItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    setTotalPrice(calculatedTotalPrice);
  }, [dialogOrderItems]);
  const handleOpenCreateOrderDialog = () => setOpenCreateOrderDialog(true);
  const handleCloseCreateOrderDialog = () => {
    setDialogOrderItems([]);
    setNewProduct(null);
    setNewQuantity(1);
    setOpenCreateOrderDialog(false);
  };

  const handleCreateOrder = () => {
    const newOrderToCreate = {
      status: "PENDING",
      userId: 1,
      total_price: totalPrice,
      customer,
      orderItems: dialogOrderItems.map((item) => {
        return {
          productId: item.id,
          quantity: item.quantity,
        };
      }),
    };
    dispatch(addNewOrder(newOrderToCreate));
    handleCloseCreateOrderDialog();
  };

  const ordersWithDisplayId = orders.map((order: any, index) => ({
    ...order,
    displayId: index + 1,
  }));

  const handleOpenAddNewProductDialog = () => setOpenAddNewProductDialog(true);

  const handleCloseAddNewProductDialog = () => {
    setOpenAddNewProductDialog(false);
  };

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductChange = (event: any) => setNewProduct(event.target.value);

  const handleQuantityChange = (event: any) => {
    setNewQuantity(parseInt(event.target.value, 10));
  };

  const handleAddProduct = () => {
    if (newProduct !== null) {
      const selectedProduct: any = products.find(
        (product: any) => product.id === newProduct
      );

      let updatedOrderItems: any = [];

      if (selectedProduct) {
        const existingProductIndex = dialogOrderItems.findIndex(
          (item) => item.id === newProduct
        );

        if (existingProductIndex !== -1) {
          updatedOrderItems = dialogOrderItems.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + newQuantity }
              : item
          );
        } else {
          updatedOrderItems = [
            ...dialogOrderItems,
            { ...selectedProduct, quantity: newQuantity },
          ];
        }

        setDialogOrderItems(updatedOrderItems);
      }

      setNewProduct(null);
      setNewQuantity(1);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setDialogOrderItems(
      dialogOrderItems.filter((item) => item.id !== productId)
    );
  };

  const handleSetCustomer = (e: any) => setCustomer(e.target.value);

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
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="flex-end" style={{ margin: "1rem 0" }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenCreateOrderDialog}
          >
            Create New Order
          </Button>
        </Grid>{" "}
      </Grid>

      <div style={{ height: 600, width: "100%", margin: "20px 0" }}>
        <DataGrid autoHeight rows={ordersWithDisplayId} columns={columns} />
      </div>

      <Dialog
        open={openCreateOrderDialog}
        onClose={handleCloseCreateOrderDialog}
        fullWidth
        maxWidth="lg"
        TransitionComponent={Grow}
      >
        <DialogTitle className={classes.title}>Create New Order</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                id="customer"
                label="Customer Name"
                type="text"
                fullWidth
                name="customer"
                value={customer}
                onChange={handleSetCustomer}
              />
            </Grid>
            <Grid container justifyContent="flex-end" xs={6}>
              <Grid item>
                <Typography variant="h6" style={{ marginTop: 20 }}>
                  Total Price: {totalPrice.toFixed(2)} EGP
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <TableContainer
            component={Paper}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Actions</TableCell>{" "}
                </TableRow>
              </TableHead>
              <TableBody>
                {dialogOrderItems.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      <Button
                        color="secondary"
                        onClick={() => handleDeleteProduct(row.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddNewProductDialog}
          >
            Add New Product
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateOrderDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateOrder} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAddNewProductDialog}
        onClose={handleCloseAddNewProductDialog}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Grow}
      >
        <DialogTitle className={classes.title}>Add New Product</DialogTitle>
        <DialogContent className={classes.content}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Product</InputLabel>
            <Select value={newProduct} onChange={handleProductChange}>
              {products.map((product: any) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            type="number"
            margin="normal"
            fullWidth
            value={newQuantity}
            onChange={handleQuantityChange}
          />{" "}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddNewProductDialog} color="primary">
            Close
          </Button>
          <Button onClick={handleAddProduct} color="primary">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrdersComponent;
