import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { addToCart, fetchProducts, getCart } from "../../api/apiMethods";
import { useEffect, useState } from "react";
const ProductTable = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const getCartProduct = async () => {
    try {
      setLoading(true);
      const response = await getCart();

      setProducts(response.data[0].productDetails);
      setCartDetails(response.data[0].cart);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      if (error.response && error.response.status === 401) {
        setSnackbarMessage("You must be logged in to view the cart.");
      } else {
        setSnackbarMessage("Failed to load cart items. Please try again.");
      }
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    getCartProduct();
  }, []);
  const removeCart = async (id) => {};
  const addCart = async (id) => {
    try {
      await addToCart({ productId: id, quantity: 1 });
      const response = await getCart();
      setProducts(response);
    } catch (error) {}
  };

  const cartDetailsMap = new Map(
    cartDetails.map((item) => [item.productId, item.quantity])
  );
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Product</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Price</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Quantity</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Subtotal</strong>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            products.map((item, itemIndex) => {
              const quantity = cartDetailsMap.get(item._id.toString()) || 0;
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: "50px", height: "50px" }}
                  />
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.price.org}</TableCell>
                <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    border: "1px solid black",
                    borderRadius: "2px",
                    padding: "4px",
                    marginTop: "5px",
                    width: "80px",
                    float: "right",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => removeCart(item._id, quantity - 1)}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  <Box component="span">{quantity}</Box>
                  <IconButton
                    size="small"
                    onClick={() => addCart(item._id, quantity + 1)}
                  >
                    <Add fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {/* {item.product.price * item.quantity} */}
                  099
                </TableCell>
                <TableCell align="right">{/* Actions go here */}</TableCell>
              </TableRow>;
            })
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProductTable;
