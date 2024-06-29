import { FilterList } from "@mui/icons-material";
import {
  Box,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import ProductCard from "../../comman/cards/ProductCard";
import { useEffect, useState } from "react";
import { fetchProducts, fetchProductsbyCategory } from "../../api/apiMethods";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useNavigate } from "react-router-dom";

const FoodListing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const onHandlerClick = (id) => {
    console.log("click", id);
    navigate(`/dishes/${id}`);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlerFilter = async (query) => {
    const data = await fetchProductsbyCategory(query);
    if (Array.isArray(data.data)) {
      setProducts(data.data);
    } else {
      console.error("Data is not array", data);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    const getProdcts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();

        if (Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data); // Update state with fetched data

          setLoading(false);
        } else {
          console.error("Data is not an array or is empty", data);
        }
      } catch (error) {
        console.error("Error while fetching", error);
      }
    };
    getProdcts();
  }, []);

  console.log("final product", products);
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
            <MenuItem
              onClick={() => {
                handlerFilter("Street Food");
              }}
            >
              Category
            </MenuItem>
            <MenuItem>minPrice</MenuItem>
            <MenuItem>maxPrice</MenuItem>
            <MenuItem>ingredients</MenuItem>
          </Menu>
        </Box>
        <CardContent sx={{ textAlign: "center", padding: "10px" }}>
          <Container>
            <Grid2 container spacing={4}>
              {loading ? (
                <CircularProgress />
              ) : (
                <>
                  {" "}
                  {/* //Food list */}
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <Grid2 item="true" xs={12} sm={6} md={4} key={product.id}>
                        <ProductCard
                          category={product}
                          goToDeatil={onHandlerClick}
                        />
                      </Grid2>
                    ))
                  ) : (
                    <Typography sx={{ textAlign: "center" }}>
                      No Food addes i list
                    </Typography>
                  )}
                </>
              )}
            </Grid2>
          </Container>
        </CardContent>
      </Container>
    </Box>
  );
};
export default FoodListing;
