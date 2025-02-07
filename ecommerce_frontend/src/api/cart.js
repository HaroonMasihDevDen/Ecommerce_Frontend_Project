import axios from "axios";
import Cookies from "js-cookie";
import {
	GET_USER_CART_ITEMS_API,
	STORE_IN_CART_API,
	DELETE_FROM_CART_API,
	VALIDATE_VOUCHER_API,
	GET_CART_ITEMS_COUNT_API,
} from "../config/api";
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
export const removeFromCart = async (cartItem_id) => {
	try {
		const response = await axios.delete(
			`${DELETE_FROM_CART_API}/${cartItem_id}`,
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
		console.error("Error fetching from cart:", error.response?.data);
		throw new Error(
			error.response?.statusText ||
				"Network response was not ok for adding to cart"
		);
	}
};

export const validate_token = async (token, applied_type) => {
	try {
		const response = await axios.post(
			`${VALIDATE_VOUCHER_API}`,
			{
				voucher_token: token,
				applied_type: applied_type,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("token auth failed:", error.response?.data);
		return { message: "invalid token", error: error.response };
	}
};

export const getCartItemCount = async () => {
	try {
		const response = await axios.get(`${GET_CART_ITEMS_COUNT_API}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: Cookies.get("Authorization") || null,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response?.status === 401) {
			Cookies.remove("Authorization");
		} else {
			console.error("Error fetching cart items:", error.response?.data);
		}
	}
};
