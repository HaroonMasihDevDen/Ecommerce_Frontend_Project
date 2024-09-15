import axios from "axios";
import { CATEGORIES_API, CATEGORIES_BY_IDs_API } from "../config/api";

export const getCategories = async () => {
	try {
		const response = await axios.get(CATEGORIES_API, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		console.log("Categories response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching categories:", error.response?.data);
		throw new Error(
			error.response?.statusText || "Network response was not ok for categories"
		);
	}
};

export const getCategoriesByID = async (catg_ids) => {
	try {
		const response = await axios.get(CATEGORIES_BY_IDs_API, {
			params: { category_ids: catg_ids }, // Ensure query parameters are in 'params'
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status !== 200) {
			console.log(
				`getCategoriesByID: network response was not ok, status code: ${response.status}`
			);
		}

		console.log("Categories by id response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw new Error(
			error.response?.statusText ||
				error.message ||
				"Network response was not ok for categories by id"
		);
	}
};
