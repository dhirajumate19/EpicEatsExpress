import { Box, Button, CardContent, Container, Typography } from "@mui/material";
import ProductTable from "../../comman/CartTable/ProductTable";
import DeliveryDetails from "../../comman/CartTable/DeliveryDetails";
import PaymentDetails from "../../comman/CartTable/PaymentDetails";

const Cart = () => {
  const onHandleClick = () => {
    alert("Your order comfrim");
  };
  return (
    <Box>
      <Container sx={{ padding: "20px 0" }}>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Your Shopping Cart
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 3 }}>
          <ProductTable />
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">SubTotal:</Typography>
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <CardContent>
            <DeliveryDetails />
          </CardContent>
          <CardContent>
            <PaymentDetails />
          </CardContent>
          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={onHandleClick}>
              Save and Continue
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default Cart;
