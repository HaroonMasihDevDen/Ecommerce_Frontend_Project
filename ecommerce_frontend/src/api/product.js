import axios from "axios";
import {
	PRODUCTS_API,
	PRODUCT_DETAILS_API,
	SEARCH_PRODUCT_API,
	FILTER_PRODUCT_API,
} from "../config/api";

export const getProducts = async () => {
	try {
		const response = await axios.get(PRODUCTS_API, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log("Products response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching product:", error.response?.data);
		throw new Error(
			error.response?.statusText || "Network response was not ok for products"
		);
	}
};

export const getProductDetails = async (productId) => {
	try {
		const response = await axios.get(`${PRODUCT_DETAILS_API}/${productId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log("Product details response hello :", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching product details:", error.response?.data);
		throw new Error(
			error.response?.statusText ||
				"Network response was not ok for product details"
		);
	}
};

export const searchProductsApi = async (query) => {
	try {
		const response = await axios.get(`${SEARCH_PRODUCT_API}`, {
			params: {
				query: query,
			},
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error searching product :", error.response?.data);
		throw new Error(error.response?.statusText || "search product failed");
	}
};

export const applyFiltersOnProducts = async (
	sizes,
	min_price,
	max_price,
	categories
) => {
	try {
		const response = await axios.get(`${FILTER_PRODUCT_API}`, {
			params: {
				sizes: sizes,
				min_price: min_price,
				max_price: max_price,
				categories: categories,
			},
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error searching product :", error.response?.data);
		throw new Error(error.response?.statusText || "search product failed");
	}
};
