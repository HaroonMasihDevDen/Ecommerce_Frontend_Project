import axios from 'axios';
import Cookies from 'js-cookie';
import { LOGIN_API, LOGOUT_API, VALIDATE_TOKEN_API } from '../config/api';

// Function to handle user login
export const login = async (userData) => {
  try {
    console.log("Login function is calling.....",LOGIN_API, userData);
    const response = await axios.post(LOGIN_API, userData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log("Login response:", response.data);

    // Assuming the token is in the 'Authorization' header
    const token = response.headers['authorization'];
    if (token) {
      Cookies.set('Authorization', token); // Store the token in cookies
      alert("Session token stored in Cookies successfully");
      const userName = response.data.status.data.user.name;
      const userEmail = response.data.status.data.user.email;
      // Store user details in localStorage
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail);
    } else {
      alert("Authorization is missing in response headers");
    }

    alert("User successfully logged in");
    return response.data;
  } catch (error) {
    console.error("Error during login:", error.response?.data);
    alert(error.response?.data?.message || 'Network response was not ok');
    throw new Error('Network response was not ok');
  }
};

// Function to validate user token
export const validateToken = async () => {
  alert("Token verification function called");
  try {
    const response = await axios.get(VALIDATE_TOKEN_API, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('Authorization'),
      }
    });

    console.log("Token is:", Cookies.get('Authorization'));
    console.log("Validate token action response:", response);

    const { name, email } = response.data.data;
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    return response.data;
  } catch (error) {
    console.error("Token validation error:", error.response?.data);
    throw new Error(error.response?.statusText || 'Network response was not ok');
  }
};

// Function to handle user logout
export const logout = async () => {
  try {
    const response = await axios.delete(LOGOUT_API, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Cookies.get('Authorization'),
      }
    });

    console.log("Token is:", Cookies.get('Authorization'));
    console.log("Logout action response:", response);
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data);
    throw new Error(error.response?.statusText || 'Network response was not ok');
  }
};
