// utils/apiHelper.js
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;

export const fetchData = async <T = undefined>(endpoint: string, method = "GET", data = {}) => {
  try {
    const response = await axios({
      url: `${endpoint}`,
      method,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      data,
    });

    return response;
  } catch (error: any) {
    // TODO - Fix error type
    throw new Error(error.response?.data?.message || error.message);
  }
};
