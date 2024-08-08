const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// auth.js
export const LOGIN_API = getApiUrl('/login');
export const LOGOUT_API = getApiUrl('/logout');
export const VALIDATE_TOKEN_API = getApiUrl('/validate_token');

// category.js
export const CATEGORIES_API = getApiUrl('/categories');


// product.js
export const PRODUCTS_API = getApiUrl('/products');
