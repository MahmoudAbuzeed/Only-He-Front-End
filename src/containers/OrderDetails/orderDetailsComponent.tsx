import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  Button,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Grid,
  Stepper,
  Step,
  StepLabel,
  makeStyles,
  Grow,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogActions,
  TextField,
  Input,
} from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app.hooks";
import { useParams } from "react-router";
import { fetchOrderById, updateOrder } from "./actions";
import { fetchProducts } from "../Products/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  statusBox: {
    border: "1px solid",
    borderColor: theme.palette.grey[400],
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    background: theme.palette.background.default,
  },
  productList: {
    marginTop: theme.spacing(2),
  },
  totalAmount: {
    fontWeight: "bold",
  },
  actionButton: {
    marginTop: theme.spacing(2),
  },

  stepper: {
    padding: theme.spacing(3, 0),
  },
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
  contentText: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginTop: theme.spacing(2),
  },
}));

const OrderDetailsComponent = () => {
  const orderDetails = useAppSelector((state) => state.orderDetails.data);
  const products = useAppSelector((state) => state.products.data);

  const [availableProducts, setAvailableProducts] = useState<any>(products);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [status, setStatus] = useState("Pending");
  const { orderId }: any = useParams();
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const [newProduct, setNewProduct] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [dialogOrderItems, setDialogOrderItems] = useState<any>(
    orderDetails?.orderItems
  );

  useEffect(() => {
    dispatch(fetchOrderById(Number(orderId)));
  }, [dispatch, orderId]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const confirmCancelOrder = () => {
    setIsOrderCancelled(true);
    setOpenCancelDialog(false);
  };

  const handleProductClick = (product: any) => setSelectedProduct(product);
  const handleCloseAddProductDialog = () => setOpenAddProductDialog(false);
  const handleOpenAddProductDialog = () => setOpenAddProductDialog(true);
  const closeCancelDialog = () => setOpenCancelDialog(false);
  const handleOpenEditDialog = () => setOpenEditDialog(true);
  const handleCancelOrder = () => setOpenCancelDialog(true);
  const handleCloseDialog = () => setSelectedProduct(null);

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const steps = ["Pending", "Processing", "Shipped", "Delivered"];

  const getStepIndex = (status: any) => steps.indexOf(status);

  const handleAddProductToOrder = () => {
    const productToAdd = {
      name: newProduct,
      quantity: newQuantity,
    };

    // Check if the product already exists in the list
    const existingProductIndex = dialogOrderItems.findIndex(
      (item: any) => item.name === newProduct
    );

    if (existingProductIndex !== -1) {
      // Product exists, update the quantity
      const updatedOrderItems = dialogOrderItems.map(
        (item: any, index: number) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + newQuantity }
            : item
      );
      setDialogOrderItems(updatedOrderItems);
    } else {
      setDialogOrderItems([...dialogOrderItems, productToAdd]);
    }

    handleCloseAddProductDialog();
  };

  const closeEditDialog = () => {
    setOpenEditDialog(false);
    setDialogOrderItems(orderDetails.orderItems);
  };

  const handleSaveChanges = () => {
    const updatedOrder = {
      ...orderDetails,
      status,
      orderItems: dialogOrderItems,
    };
    dispatch(updateOrder(updatedOrder));
  };

  return (
    <Container maxWidth="lg">
      <Grow in={true} timeout={1000}>
        <Paper elevation={5} style={{ padding: "24px 48px" }}>
          <Typography variant="h4" gutterBottom className={classes.header}>
            Order Details
          </Typography>
          <Divider className={classes.divider} />
          <Grid container spacing={3}>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item style={{ padding: "30px" }}>
                <Typography variant="body1">
                  <strong>Order ID: {orderDetails.id}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  <strong>
                    Date:{" "}
                    {new Date(orderDetails.created_at).toLocaleDateString()}
                  </strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  <strong>Customer: {orderDetails.user}</strong>
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Products:
              </Typography>

              <Grid container spacing={2}>
                {orderDetails?.orderItems.map((product: any, index: any) => (
                  <Grid item xs={2} key={index}>
                    <ListItem
                      button
                      onClick={() => handleProductClick(product)}
                      className={classes.productList}
                    >
                      <ListItemText primary={product.name} />
                    </ListItem>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Current Status
              </Typography>
              <Stepper
                activeStep={getStepIndex(status)}
                alternativeLabel
                className={classes.stepper}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Change Status</InputLabel>
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  label="Change Status"
                  disabled={isOrderCancelled}
                >
                  {steps.map((step) => (
                    <MenuItem key={step} value={step}>
                      {step}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.totalAmount}>
                Total Price: ${orderDetails.total_price.toFixed(2)}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpenEditDialog}
                className={classes.actionButton}
              >
                Edit Order
              </Button>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancelOrder}
                className={classes.actionButton}
              >
                Cancel Order
              </Button>
              {/* Cancel Order Confirmation Dialog */}
              <Dialog
                open={openCancelDialog}
                onClose={closeCancelDialog}
                TransitionComponent={Grow}
              >
                <DialogTitle>Confirm Cancellation</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to cancel this order?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeCancelDialog} color="primary">
                    No
                  </Button>
                  <Button onClick={confirmCancelOrder} color="secondary">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>

            <Dialog
              open={!!selectedProduct}
              onClose={handleCloseDialog}
              classes={{ paper: classes.dialog }}
              TransitionComponent={Grow}
            >
              <DialogTitle className={classes.title}>
                {selectedProduct?.name}
              </DialogTitle>
              <DialogContent className={classes.content}>
                <DialogContentText className={classes.contentText}>
                  Quantity: {selectedProduct?.quantity}
                  <br />
                  Price: ${selectedProduct?.price.toFixed(2)}
                </DialogContentText>
              </DialogContent>
            </Dialog>

            <Dialog
              open={openEditDialog}
              onClose={() => setOpenEditDialog(false)}
              fullWidth
              maxWidth="lg"
              TransitionComponent={Grow}
            >
              <DialogTitle className={classes.title}>Edit Order</DialogTitle>
              <DialogContent className={classes.content}>
                <Grid container spacing={2}>
                  {/* Order ID - Read Only */}
                  <Grid item xs={6}>
                    <TextField
                      label="Order ID"
                      variant="outlined"
                      fullWidth
                      value={orderDetails.id}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  {/* Date - Read Only */}
                  <Grid item xs={6}>
                    <TextField
                      label="Date"
                      variant="outlined"
                      fullWidth
                      value={new Date(
                        orderDetails.created_at
                      ).toLocaleDateString()}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  {/* Customer Information */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Customer Name"
                      variant="outlined"
                      fullWidth
                      value={orderDetails.user}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  {/* Status Selection */}
                  <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={status}
                        onChange={handleStatusChange}
                        label="Status"
                      >
                        {steps.map((step) => (
                          <MenuItem key={step} value={step}>
                            {step}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Products List */}
                  {dialogOrderItems.map((product: any, index: number) => (
                    <React.Fragment key={index}>
                      <Grid item xs={10} md={11}>
                        <TextField
                          label="Product Name"
                          variant="outlined"
                          fullWidth
                          value={product.name}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={2} md={1} key={index}>
                        <TextField
                          label="Quantity"
                          type="number"
                          variant="outlined"
                          fullWidth
                          value={product.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value, 10);
                            const updatedOrderItems = dialogOrderItems.map(
                              (item: any, idx: number) =>
                                idx === index
                                  ? { ...item, quantity: newQuantity }
                                  : item
                            );
                            setDialogOrderItems(updatedOrderItems);
                          }}
                        />
                      </Grid>
                    </React.Fragment>
                  ))}

                  {/* Add New Product Button */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenAddProductDialog}
                    >
                      Add Product
                    </Button>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    closeEditDialog();
                  }}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSaveChanges()} color="secondary">
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openAddProductDialog}
              onClose={handleCloseAddProductDialog}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  {" "}
                  {/* Spacing between grid items */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Product</InputLabel>
                      <Select
                        value={newProduct}
                        onChange={(e: any) => setNewProduct(e.target.value)}
                      >
                        {availableProducts.map(
                          (product: any, index: number) => (
                            <MenuItem key={index} value={product.name}>
                              {product.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Quantity</InputLabel>
                      <Input
                        type="number"
                        value={newQuantity}
                        onChange={(e) =>
                          setNewQuantity(parseInt(e.target.value, 10))
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAddProductDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAddProductToOrder} color="primary">
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Paper>
      </Grow>
    </Container>
  );
};

export default OrderDetailsComponent;
