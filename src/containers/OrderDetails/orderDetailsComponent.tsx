import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Divider,
  ListItem,
  ListItemText,
  Button,
  FormControl,
  InputLabel,
  Select,
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
} from "@material-ui/core";

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

const OrderDetailsComponent: React.FC<{ orderDetails: any }> = ({
  orderDetails,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [status, setStatus] = useState("Pending");
  const classes = useStyles();

  const [isOrderCancelled, setIsOrderCancelled] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  // ... other methods

  const handleCancelOrder = () => {
    setOpenCancelDialog(true);
  };

  const confirmCancelOrder = () => {
    setIsOrderCancelled(true);
    setOpenCancelDialog(false);
    console.log("Order cancelled");
  };

  const closeCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatus(event.target.value as string);
  };

  const steps = ["Pending", "Processing", "Shipped", "Delivered"];

  const getStepIndex = (status: any) => {
    return steps.indexOf(status);
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
                  <strong>Order ID: {orderDetails.orderId}</strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  <strong>
                    Date: {new Date(orderDetails.date).toLocaleDateString()}
                  </strong>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">
                  <strong>Customer: {orderDetails.customerName}</strong>
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Products:
              </Typography>

              <Grid container spacing={2}>
                {orderDetails.products.map((product: any, index: any) => (
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
                Total Amount: ${orderDetails.totalAmount.toFixed(2)}
              </Typography>
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
          </Grid>
        </Paper>
      </Grow>
    </Container>
  );
};

export default OrderDetailsComponent;
