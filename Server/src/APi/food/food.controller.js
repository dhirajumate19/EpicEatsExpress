import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";
import { foodModel } from "./food.model.js";

// Controller function to add products
export const addProductsController = async (req, res) => {
  try {
    const foodData = req.body;
    // Check if the request body is an array
    if (!Array.isArray(foodData)) {
      return res.send(
        FailedResponse(400, "Invalid request! Expected an Array.")
      );
    }
    let response = [];
    // Iterate through each food item in the request
    for (const foodInfo of foodData) {
      const { name, description, img, price, category, ingredients } = foodInfo;
      // Create a new food model instance
      const newFood = new foodModel({
        name,
        description,
        img,
        price,
        category,
        ingredients,
      });
      // Save the new food item to the database
      response.push(await newFood.save());
    }

    res.send(SuccessResponse(response, "Products added successfully."));
  } catch (error) {
    res.send(FailedResponse(500, "Internal Error."));
  }
};

// Controller function to retrieve product items
export const getProductItems = async (req, res) => {
  try {
    let { category, minPrice, maxPrice, ingredients, search } = req.query;

    let pipeline = [];
    // Construct aggregation pipeline based on query parameters
    if (category && category.length > 0) {
      pipeline.push({ $match: { category: category } });
    }
    if (minPrice || maxPrice) {
      const priceMatch = {};
      if (minPrice) priceMatch["$gte"] = parseFloat(minPrice);
      if (maxPrice) priceMatch["$lte"] = parseFloat(maxPrice);
      pipeline.push({ $match: { price: priceMatch } });
    }
    if (ingredients) {
      const ingredientsArray = ingredients.split(",");
      pipeline.push({ $match: { ingredients: { $in: ingredientsArray } } });
    }
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: new RegExp(search, "i") } },
            { description: { $regex: new RegExp(search, "i") } },
          ],
        },
      });
    }
    // Execute aggregation pipeline or find operation based on pipeline length
    const foodList =
      pipeline.length !== 0
        ? await foodModel.aggregate(pipeline)
        : await foodModel.find();
    // Check if any food items were found
    if (foodList.length === 0) {
      return res.send(
        SuccessResponse(
          [],
          "No food items matched the filters. Please try something else."
        )
      );
    }
    // Send the response with retrieved food items
    res.send(SuccessResponse(foodList, "Food items retrieved."));
  } catch (error) {
    console.log(error);
    res.send(FailedResponse(500, "Internal Error."));
  }
};
