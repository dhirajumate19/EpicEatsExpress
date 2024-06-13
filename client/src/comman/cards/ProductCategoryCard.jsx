import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";

const CategoryImage = styled(CardMedia)({
  height: 50,
});
const CategoryCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 20,
  textAlign: "center",
});
const ProductCategoryCard = ({ category }) => {
  console.log("image", category.img);
  return (
    <>
      <CategoryCard>
        <CategoryImage src={category.img} alt="category" />
        <CardContent sx={{ padding: 20 }}>
          <Button variant="contained" color="primary">
            {category.name}
          </Button>
          <Typography variant="caption" color="CaptionText">
            {category.off}
          </Typography>
        </CardContent>
      </CategoryCard>
    </>
  );
};
export default ProductCategoryCard;
