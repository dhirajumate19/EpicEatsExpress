import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";

const CategoryCard = styled(Card)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 10,
  textAlign: "center",
  overflow: "hidden",
});
const HoverImage = styled(CardMedia)({
  borderRadius: "6px",
  objectFit: "cover",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
  },
});
const OverlayText = styled(Box)({
  position: "absolute",
  top: 10,
  right: 9,
  backgroundColor: "rgba(0,250,0,0.3)",
  color: "white",
  padding: "5px 10px",
  borderRadius: "0 0 0 5px",
  fontSize: "0.7rem",
  zIndex: 1,
});
const ProductCategoryCard = ({ category }) => {
  return (
    <>
      <CategoryCard>
        <OverlayText>{category.off}</OverlayText>
        <HoverImage
          component="img"
          height="140"
          image={category.img}
          alt={category.name}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Button variant="text" color="primary">
            {category.name}
          </Button>
        </Box>
      </CategoryCard>
    </>
  );
};
export default ProductCategoryCard;
