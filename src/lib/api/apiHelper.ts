// utils/apiHelper.js
import axios from 'axios';
import { isErrorResponse } from '../utils';
import toast from 'react-hot-toast';

const API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;

export const fetchData = async (
  endpoint: string,
  method = 'GET',
  data = {}
) => {
  try {
    const response = await axios({
      url: `${endpoint}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      data,
    });

    return response;
  } catch (error: unknown) {
    if (isErrorResponse(error)) {
      toast.error(error.message);
    } else {
      toast.error('An unknown error occurred');
    }
  }
};
