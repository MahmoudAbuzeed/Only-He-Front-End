/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { deleteProduct, fetchProductById, updateProduct } from "./actions";
import { useAppDispatch, useAppSelector } from "../../app.hooks";
import { makeStyles } from "@material-ui/core/styles";
import Fade from "@material-ui/core/Fade";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { GridCloseIcon } from "@mui/x-data-grid";
import { fetchProducts } from "../Products/actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
  },
  button: {
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  imagePreview: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1),
  },
  imageInput: {
    display: "none",
  },
  imageLabel: {
    marginTop: theme.spacing(1),
  },

  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
    gap: theme.spacing(2),
  },
  imageContainer: {
    position: "relative",
    width: "100px",
    height: "100px",
    overflow: "visible",
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.5)",
      zIndex: 1,
      "& $image": {
        boxShadow: `0px 0px 10px ${theme.palette.grey[500]}`,
      },
      "& $closeIcon": {
        display: "block",
      },
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: theme.shape.borderRadius,
    transition: "box-shadow 0.3s ease",
  },
  closeIcon: {
    display: "none",
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "50%",
    padding: "2px",
    transition: "display 0.3s ease",
  },
}));

const ProductDetailsComponent = () => {
  const classes = useStyles();
  const { productId }: any = useParams();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const product = useAppSelector((state) => state.product.data);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editData, setEditData] = React.useState(product);
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [productImages, setProductImages] = React.useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
  }, [dispatch, productId]);

  useEffect(() => {
    setEditData(product);
  }, [product]);

  useEffect(() => {
    if (product && product.images) {
      setSelectedImages(product.images);
    }
  }, [product]);

  const handleOpenEditDialog = () => {
    setSelectedImages(product.images || []);
    setImageFiles([]);
    setEditData({ ...product }); // Initialize editData with the complete product data
    setOpenEditDialog(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...newImageUrls]);
      setImageFiles([...imageFiles, ...filesArray]);
    }
  };

  const handleRemoveImage = (url: any) => {
    setSelectedImages(selectedImages.filter((image) => image !== url));
    const fileIndex = imageFiles.findIndex(
      (file) => URL.createObjectURL(file) === url
    );
    if (fileIndex >= 0) {
      setImageFiles(imageFiles.filter((_, index) => index !== fileIndex));
    }
  };

  const handleSaveEdit = () => {
    const updatedProduct = {
      ...editData,
      images: [...selectedImages, ...imageFiles],
    };
    dispatch(updateProduct(updatedProduct));
    handleCloseEditDialog();
  };

  if (!product) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  const handleCloseEditDialog = () => setOpenEditDialog(false);

  if (!editData) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }
  const defaultImages = [
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/200/300",
  ];

  const renderImages = () => {
    return (
      <div className={classes.imageGrid}>
        {defaultImages.map((image, index) => (
          <div key={index} className={classes.imageContainer}>
            <img
              src={image}
              alt={`${product?.name || "Product"} - Image ${index + 1}`}
              className={classes.image}
            />
            <GridCloseIcon
              className={classes.closeIcon}
              onClick={() => handleRemoveProductImage(index)}
            />
          </div>
        ))}
      </div>
    );
  };

  const handleEditChange = (e: any) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRemoveProductImage = (index: any) => {
    const updatedImages = productImages.filter(
      (_, imgIndex) => imgIndex !== index
    );
    setProductImages(updatedImages);
  };

  const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(fetchProducts());
        history.push(`/products`);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });

    handleCloseDeleteDialog();
  };

  console.log({ editData });

  return (
    <Container maxWidth="md" style={{ padding: "2rem" }}>
      <Fade in timeout={1000}>
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                {product?.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {product?.description}
              </Typography>
              <Typography variant="h6">Price: ${product?.price}</Typography>
              <Typography variant="body1">
                Category: {product?.category?.name || "N/A"}
              </Typography>
              <Typography variant="body1">
                Quantity: {product?.quantity}
              </Typography>
              <Typography variant="body1">Offer: {product?.offer}%</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {renderImages()}
            </Grid>
          </Grid>
        </Paper>
      </Fade>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        style={{ marginRight: "1rem" }}
        onClick={handleOpenEditDialog}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleOpenDeleteDialog}
      >
        Delete
      </Button>
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            fullWidth
            name="name"
            value={editData.name || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={editData.description || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            name="price"
            value={editData.price || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="quantity"
            label="Quantity"
            type="number"
            fullWidth
            name="quantity"
            value={editData.quantity || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="customerPrice"
            label="Customer Price"
            type="number"
            fullWidth
            name="customer_price"
            value={editData.customer_price || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="originalPrice"
            label="Original Price"
            type="number"
            fullWidth
            name="original_price"
            value={editData.original_price || ""}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="offer"
            label="Offer"
            type="number"
            fullWidth
            name="offer"
            value={editData.offer || ""}
            onChange={handleEditChange}
          />
          <div>
            {selectedImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Selected Image ${index + 1}`}
                  className={classes.imagePreview}
                />
                <Button onClick={() => handleRemoveImage(image)}>Remove</Button>
              </div>
            ))}
            <input
              accept="image/*"
              className={classes.imageInput}
              id="image-file-input"
              multiple
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-file-input" className={classes.imageLabel}>
              <Button variant="contained" component="span">
                Upload Image
              </Button>
            </label>
          </div>
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductDetailsComponent;
