import { Button } from "@mui/material";

const SIgninUpButton = ({ children, type }) => (
  <Button variant="contained" type={type} sx={{ backgroundColor: "black" }}>
    {children}
  </Button>
);

export default SIgninUpButton;
