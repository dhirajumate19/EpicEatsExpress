import { Box, Button, TextField, Typography } from "@mui/material";

const DeliveryDetails = () => {
  return (
    <Box
      sx={{
        width: "40%",
        padding: 1,
        justifyContent: "center",
      }}
    >
      <Typography>Deliver Information</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField label="Name">Name</TextField>
        <TextField label="Email Address" type="email">
          Email
        </TextField>
        <TextField label="Phone Number" type="number">
          Phone Number
        </TextField>
        <TextField label="Full Address">Full Address</TextField>
      </Box>
    </Box>
  );
};
export default DeliveryDetails;
