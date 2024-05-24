import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";
import { foodModel } from "./food.model.js";
export const addProductsController = async (req, res) => {
  try {
    const foodData = req.body;
    if (!Array.isArray(foodData)) {
      return res.send(
        FailedResponse(400, "Invalid request!, Expected an Array")
      );
    }
    let response = [];
    for (const foodInfo of foodData) {
      const { name, description, img, price, category, ingredients } = foodInfo;
      const newFood = new foodModel({
        name,
        description,
        img,
        price,
        category,
        ingredients,
      });
      response.push(await newFood.save());
    }

    res.send(SuccessResponse(response, "Products added successfully"));
  } catch (error) {
    res.send(FailedResponse(500, "Internal Error"));
  }
};
export const getProductItems = async (req, res) => {
  try {
    let { categories, minPrice, maxPrice, ingredients, search } = req.query;

    const pipeline = [];

    // Match stage to filter documents based on category and ingredient
    if (categories) {
      pipeline.push({
        $match: { categories: categories },
      });
    }
    if (ingredients) {
      pipeline.push({ $match: { ingredients: ingredients } });
    }

    // Add a match stage to filter by price range
    if (maxPrice || minPrice) {
      const priceMatch = {};
      if (minPrice) {
        priceMatch["$gte"] = parseFloat(minPrice);
      }
      if (maxPrice) {
        priceMatch["$lte"] = parseFloat(maxPrice);
      }
      pipeline.push({ $match: { "price.org": priceMatch } });
    }

    // Add a match stage to search by name or description
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

    // Check if the pipeline is empty
    if (pipeline.length === 0) {
      const allPRoduct = await foodModel.find();
      return res.send(SuccessResponse(allPRoduct, "all data"));
    }

    console.log("pipeline", pipeline[0]);

    // Execute the aggregation pipeline
    const foodList = await foodModel.aggregate(pipeline);

    // Send the response
    res.send(SuccessResponse(foodList, "Food Retrieved"));
  } catch (error) {
    console.log(error);
    res.send(FailedResponse(500, "Internal Error"));
  }
};
