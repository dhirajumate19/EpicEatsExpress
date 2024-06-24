import {
  Box,
  Button,
  CircularProgress,
  Container,
  Rating,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { getProductDetails } from "../../api/apiMethods";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getProductDetails(id);
      setProduct(response.data.data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);
  console.log("product", product);
  if (loading) {
    return <CircularProgress />;
  }
  const addCart = () => {
    setCartLoading(true);
    navigate("/cart");
  };

  return (
    <Container
      sx={{
        padding: "20px 30px",
        paddingBottom: "200px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
        background: (theme) => theme.bg,
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            width: "100%",
            flex: 1,
            maxWidth: "1400px",
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 0.7, display: "flex", justifyContent: "center" }}>
            <img
              src={product?.img}
              alt={product?.name}
              style={{
                maxWidth: "500px",
                width: "100%",
                maxHeight: "500px",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              gap: "18px",
              flexDirection: "column",
              padding: "4px 10px",
            }}
          >
            <Typography variant="h4">{product?.name}</Typography>
            <Rating value={3.5} readOnly />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "22px",
                fontWeight: 500,
              }}
            >
              ₹{product?.price}{" "}
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: (theme) => theme.text_secondary + 50,
                }}
              >
                ₹{200}
              </Typography>{" "}
              <Typography variant="body2" sx={{ color: "green" }}>
                {" "}
                (₹{2}% Off){" "}
              </Typography>
            </Box>
            <Typography variant="body1">{product?.desc}</Typography>
            <Box sx={{ fontSize: "16px", fontWeight: 500 }}>
              Ingredients
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginTop: "8px",
                }}
              >
                {product?.ingredients.map((ingredient, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: (theme) => theme.primary + 20,
                      color: (theme) => theme.primary,
                      fontSize: "14px",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {ingredient}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                padding: { xs: "12px 0px", md: "32px 0px" },
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={addCart}
                disabled={cartLoading}
              >
                Add to Cart
              </Button>
              <Button variant="contained" fullWidth>
                Order Now
              </Button>
              <IconButton
                // onClick={favorite ? removeFavourite : addFavourite}
                disabled={favoriteLoading}
              >
                {favorite ? (
                  <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                ) : (
                  <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                )}
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default FoodDetails;
