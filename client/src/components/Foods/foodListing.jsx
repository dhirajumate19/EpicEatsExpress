import { Filter, FilterList } from "@mui/icons-material";
import {
  Box,
  CardContent,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ProductCard from "../../comman/cards/ProductCard";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/apiMethods";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const FoodListing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilter = () => {};
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const getProdcts = async () => {
      try {
        const data = await fetchProducts();

        if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Data is not array", data);
        }
      } catch (error) {
        console.log("Error while fetching", error);
      }
    };
    getProdcts();
  }, []);
  console.log("product", products.img);

  const color = `#544726`;
  return (
    <Box>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={2}
        >
          <Typography variant="h4">Food Listing</Typography>
          <IconButton onClick={handleClick}>
            <FilterList />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleFilter}>category</MenuItem>
            <MenuItem>minPrice</MenuItem>
            <MenuItem>maxPrice</MenuItem>
            <MenuItem>ingredients</MenuItem>
          </Menu>
        </Box>
        <CardContent sx={{ textAlign: "center", padding: "10px" }}>
          <Container>
            <Grid2 container spacing={4}>
              {products.length > 0 ? (
                products.map((product, index) => (
                  <Grid2 item="true" xs={12} sm={6} md={4} key={product.id}>
                    <ProductCard product={product} />
                  </Grid2>
                ))
              ) : (
                <Typography sx={{ textAlign: "center" }}>
                  No Food addes i list
                </Typography>
              )}
            </Grid2>
          </Container>
        </CardContent>
      </Container>
    </Box>
  );
};
export default FoodListing;
