import axios from "axios";
import Cookies from "js-cookie";
import { GET_USER_CART_ITEMS_API, STORE_IN_CART_API } from "../config/api";
export const addToCart = async (productID, sizeID, quantity) => {
  if (
    typeof productID !== "number" ||
    typeof sizeID !== "number" ||
    typeof quantity !== "number"
  ) {
    throw new Error(
      "Invalid input parameters. Product ID, size ID, and quantity must be numbers."
    );
  }

  if (productID <= 0 || sizeID <= 0 || quantity <= 0) {
    throw new Error(
      "Invalid input parameters. Product ID, size ID, and quantity must be positive numbers."
    );
  }

  try {
    const response = await axios.post(
      `${STORE_IN_CART_API}`,
      {
        product_id: productID,
        size_id: sizeID,
        quantity: quantity,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("Authorization") || null,
        },
      }
    );

    console.log("Cart response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error.response?.data);
    throw new Error(
      error.response?.statusText ||
        "Network response was not ok for adding to cart"
    );
  }
};

export const get_user_cart_items = async () => {
  try {
    const response = await axios.get(`${GET_USER_CART_ITEMS_API}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("Authorization") || null,
      },
    });
    console.log("Cart response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching from cart:", error.response?.data);
    throw new Error(
      error.response?.statusText ||
        "Network response was not ok for adding to cart"
    );
  }
};
