import mongoose from "mongoose";
import {
  FailedResponse,
  SuccessResponse,
} from "../../utils/responses/response.js";
import { userModel } from "../users/users.model.js";

//add to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;

    const user = await userModel.findById(userJWT.userId);

    const exstinfCartItemIndex = user.cart.findIndex((item) => {
      item.product.equals(productId);
    });
    if (exstinfCartItemIndex !== -1) {
      user.cart[exstinfCartItemIndex].quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }
    await user.save();

    return res
      .status(201)
      .send(SuccessResponse(user, "Product added to cart successfully"));
    // console.log("user", user);
  } catch (error) {
    console.log(error);
    res.status(501).send(FailedResponse(501, "Internal Error"));
  }
};

//get item from products
export const getAllCartProduct = async (req, res) => {
  try {
    const userJWT = req.user;
    const userId = new mongoose.Types.ObjectId(userJWT.userId);
    const cartItem = await userModel.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $unwind: "$cart",
      },
      {
        $lookup: {
          from: "foods",
          localField: "cart.product",
          foreignField: "_id",
          as: "productDeatils",
        },
      },
      { $unwind: "$productDeatils" },
      {
        $group: {
          _id: "$_id",
          cart: {
            $push: { product: "$productDeatils", quantity: "$cart.quantity" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          cart: 1,
        },
      },
    ]);

    if (cartItem.length === 0) {
      return res.status(200).send([]);
    }
    return res.status(201).send(SuccessResponse(cartItem, "Cart Item "));
  } catch (error) {
    console.log(error);
    res.status(501).send(FailedResponse(501, "Internal Error"));
  }
};

//remove item from cart

export const removeItemFromCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userJWT = req.user;
    const user = await userModel.findById(userJWT.userId);
    if (!user) {
      return res.status(404).send(FailedResponse(404, "User not found"));
    }

    const cartItemIndex = user.cart.findIndex((item) => {
      item.product.equals(productId);
    });

    if (cartItemIndex === -1) {
      return res.status(404).send(FailedResponse(404, "Product is not found"));
    }

    if (quantity >= user.cart[cartItemIndex].quantity) {
      user.cart.splice(cartItemIndex, 1);
    } else {
      user.cart[cartItemIndex].quantity -= quantity;
    }
    //remove item from cart

    await user.save();
    return res
      .status(200)
      .send(
        SuccessResponse(user.cart, "Product removed from cart successfully")
      );
  } catch (error) {
    console.log(error);
    res.status(501).send(FailedResponse(501, "Internal Error"));
  }
};
