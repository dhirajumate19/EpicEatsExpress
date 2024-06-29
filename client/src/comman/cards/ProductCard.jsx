import { FavoriteRounded, ShoppingBagRounded } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Typography,
  Rating,
  styled,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 10,
  textAlign: "center",
  overflow: "hidden",
  borderRadius: theme.shape.borderRadius,
  position: "relative",
}));

const HoverImage = styled(CardMedia)(({ theme }) => ({
  height: 250,
  borderRadius: theme.shape.borderRadius,
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
}));

const IconMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: 10,
  display: "none",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: theme.shape.borderRadius,
  padding: "3px",
  zIndex: 1,
}));

const Top = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s ease-out",
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
  "&:hover .hover-image": {
    opacity: 0.9,
    transform: "scale(1.1)",
  },
  "&:hover .icon-menu": {
    display: "flex",
  },
}));

const OverlayRating = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.2)",
  color: "white",
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontSize: "0.7rem",
  zIndex: 10,
}));

const ProductCard = ({ category, goToDeatil }) => {
  const { _id, name, description, img, price } = category;
  console.log("price", price);
  const { org = 0, mrp = 0, off = 0 } = price || {};
  return (
    <CategoryCard
      onClick={() => {
        goToDeatil(_id);
      }}
    >
      <Top>
        <HoverImage component="img" image={img} className="hover-image" />
        <IconMenu className="icon-menu">
          <MenuItem>
            <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
          </MenuItem>
          <MenuItem>
            <ShoppingBagRounded sx={{ fontSize: "20px", color: "black" }} />
          </MenuItem>
        </IconMenu>
        <OverlayRating>
          <Rating value={3.5} sx={{ fontSize: "14px" }} readOnly />
        </OverlayRating>
      </Top>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "22px",
            fontWeight: 500,
          }}
        >
          ₹{org}{" "}
          <Typography
            variant="body2"
            sx={{
              textDecoration: "line-through",
              color: (theme) => theme.text_secondary + 50,
            }}
          >
            ₹{mrp}
          </Typography>{" "}
          <Typography variant="body2" sx={{ color: "green" }}>
            {" "}
            (₹{off} Off){" "}
          </Typography>
        </Box>
      </CardContent>
    </CategoryCard>
  );
};

export default ProductCard;
