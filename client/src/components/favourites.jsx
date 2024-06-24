import { Box, CardContent, Container, Typography } from "@mui/material";
import ProductCard from "../comman/cards/ProductCard";
import { category } from "../utils/data.js";
const Favorites = () => {
  return (
    <Box>
      <Container>
        <Typography sx={{ textAlign: "center" }}>Your Favorites</Typography>
        <CardContent sx={{ display: "flex", gap: 1 }}>
          <ProductCard category={category} />
          {/* <ProductCard />
          <ProductCard /> */}
        </CardContent>
      </Container>
    </Box>
  );
};
export default Favorites;
