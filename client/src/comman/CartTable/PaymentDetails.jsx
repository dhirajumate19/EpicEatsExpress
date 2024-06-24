import { Box, TextField, Typography } from "@mui/material";

const PaymentDetails = () => {
  return (
    <Box>
      <Typography>Payment Details</Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField label="Card Number"></TextField>
        <TextField type="date"></TextField>
        <TextField label="CVV" type="number"></TextField>
        <TextField label="Card holder name" type="text"></TextField>
      </Box>
    </Box>
  );
};
export default PaymentDetails;
