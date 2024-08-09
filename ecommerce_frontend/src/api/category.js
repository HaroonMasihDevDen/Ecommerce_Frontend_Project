import axios from 'axios';
import { CATEGORIES_API } from '../config/api';

export const getCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_API, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Categories response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data);
      throw new Error(error.response?.statusText || 'Network response was not ok for categories');
    }
};

