import { Add, Remove } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const ProductTable = () => {
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
          {/* Map your data here */}
          {/* Example Row */}
          <TableRow>
            <TableCell component="th" scope="row">
              Example Product
            </TableCell>
            <TableCell align="right">$10.00</TableCell>
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
              <IconButton size="small">
                <Remove fontSize="small" />
              </IconButton>
              <Box component="span">2</Box>
              <IconButton size="small">
                <Add fontSize="small" />
              </IconButton>
            </TableCell>
            <TableCell align="right">$20.00</TableCell>
            <TableCell align="right">{/* Actions go here */}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProductTable;
