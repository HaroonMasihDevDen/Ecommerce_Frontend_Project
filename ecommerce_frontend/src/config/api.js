// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// if (!API_BASE_URL) {
//   console.error('API_BASE_URL is not defined. Check your .env file.');
// }

// export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;

// API routes
export const LOGIN_API = getApiUrl('/login');
export const LOGOUT_API = getApiUrl('/logout');
export const VALIDATE_TOKEN_API = getApiUrl('/validate_token');
