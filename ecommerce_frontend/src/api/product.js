import axios from 'axios';
import { PRODUCTS_API } from '../config/api';

export const getProducts = async () => {
    try {
      const response = await axios.get(PRODUCTS_API, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Products response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error.response?.data);
      throw new Error(error.response?.statusText || 'Network response was not ok for products');
    }
};

