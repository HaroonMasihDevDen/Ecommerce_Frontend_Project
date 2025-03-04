const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// auth.js
export const LOGIN_API = getApiUrl("/login");
export const REGISTER_API = getApiUrl("/signup");
export const LOGOUT_API = getApiUrl("/logout");
export const VALIDATE_TOKEN_API = getApiUrl("/validate_token");

// category.js
export const CATEGORIES_API = getApiUrl("/categories");
export const CATEGORIES_BY_ID_API = getApiUrl("/category_products");
export const CATEGORIES_BY_IDs_API = getApiUrl(
	"/category_products/category_products_with_multiple_category_ids"
);

// product.js
export const PRODUCTS_API = getApiUrl("/products");
export const PRODUCT_DETAILS_API = getApiUrl("/products");
export const SEARCH_PRODUCT_API = getApiUrl("/products/search");
export const FILTER_PRODUCT_API = getApiUrl("/products/filter");

// cart.js
export const STORE_IN_CART_API = getApiUrl("/cart_items");
export const GET_USER_CART_ITEMS_API = getApiUrl("/cart_items");
export const DELETE_FROM_CART_API = getApiUrl("/cart_items");
export const VALIDATE_VOUCHER_API = getApiUrl("/validate_voucher");
