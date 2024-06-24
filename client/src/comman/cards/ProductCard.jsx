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
  return (
    <CategoryCard
      onClick={() => {
        goToDeatil(category._id);
      }}
    >
      <Top>
        <HoverImage
          component="img"
          image={category.img}
          className="hover-image"
        />
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
        <Typography variant="h6">{category.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {category.description}
        </Typography>
        <Typography
          sx={{
            fontSize: "18px",
            display: "flex",
            gap: 1,
            textAlign: "center",
          }}
        >
          {category.price} <span style={{ fontSize: "14px" }}>$20</span>{" "}
          <Box sx={{ fontSize: "12px", fontWeight: 500, color: "green" }}>
            (20% Off)
          </Box>
        </Typography>
      </CardContent>
    </CategoryCard>
  );
};

export default ProductCard;
