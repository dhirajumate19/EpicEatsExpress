import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  IconButton,
  styled,
} from "@mui/material";

import { CheckCircleOutline, Fastfood, LocalDining } from "@mui/icons-material";
import { category } from "../utils/data.js";
import headerImage from "../assets/Header.png";
import ProductCategoryCard from "../comman/cards/ProductCategoryCard.jsx";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2.js";
const HeaderImage = styled("img")({
  width: "100%",
  height: "auto",
  marginBottom: "20px",
});
const color = `#544726`;
const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url(/path/to/your/image.jpg)",
          backgroundSize: "cover",
          padding: "0 0",
          textAlign: "center",
          color: "white",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", marginBottom: "20px", color: "#f2aa6b" }}
          >
            Welcome to EpicEatsExpress
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginBottom: "40px", color: "#87674a" }}
          >
            Your favorite meals delivered fast and fresh!
          </Typography>
          <HeaderImage src={headerImage} alt="Header" />
        </Container>
      </Box>
      {/* Add all product  */}

      <Container sx={{ textAlign: "center", padding: "10px" }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: { color }, fontSize: "2rem" }}
        >
          Food Categories
        </Typography>
        <Grid2 container spacing={4}>
          {category.map((category, index) => (
            <Grid2 item="true" xs={12} sm={6} md={4} key={index}>
              <ProductCategoryCard category={category} />
            </Grid2>
          ))}
        </Grid2>
      </Container>

      {/* Features Section */}
      <Container sx={{ padding: "60px 0" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "40px", color: { color } }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Fastfood fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
                Wide Variety
              </Typography>
              <Typography>
                Choose from a wide range of dishes and cuisines.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <LocalDining fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
                Fresh Ingredients
              </Typography>
              <Typography>
                Our dishes are prepared using fresh, high-quality ingredients.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <CheckCircleOutline fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
                Fast Delivery
              </Typography>
              <Typography>
                Get your food delivered quickly and enjoy while it's hot.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Popular Dishes Section */}

      {/* Testimonials Section */}
      <Container sx={{ padding: "60px 0" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "40px", color: { color } }}
        >
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          {/* Repeat this Grid item for each testimonial */}
          <Grid item xs={12} md={4}>
            <Box textAlign="center">
              <Avatar
                src="/path/to/customer.jpg"
                sx={{ width: 56, height: 56, margin: "auto" }}
              />
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
                Customer Name
              </Typography>
              <Typography>"Amazing service and delicious food!"</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ backgroundColor: "#f7f7f7", padding: "60px 0" }}>
        <Container>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginBottom: "40px", color: { color } }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4}>
            {/* Repeat this Grid item for each step */}
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6">Step 1: Browse Menu</Typography>
                <Typography>
                  Explore our diverse menu and choose your favorite dishes.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6">Step 2: Place Order</Typography>
                <Typography>
                  Place your order online through our easy-to-use platform.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6">Step 3: Enjoy</Typography>
                <Typography>
                  Get your food delivered fast and enjoy your meal!
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#333", color: "white", padding: "20px 0" }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">EpicEatsExpress</Typography>
              <Typography>
                © 2023 EpicEatsExpress. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
              {/* Add social media icons here */}
              <Typography>Follow us on:</Typography>
              {/* Example icons */}
              <IconButton color="inherit">
                <i className="fab fa-facebook"></i>
              </IconButton>
              <IconButton color="inherit">
                <i className="fab fa-twitter"></i>
              </IconButton>
              <IconButton color="inherit">
                <i className="fab fa-instagram"></i>
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
