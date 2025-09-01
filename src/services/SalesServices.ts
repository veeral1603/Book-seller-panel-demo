import axios, { AxiosError } from "axios";

export const getSalesData = async () => {
  try {
    const response = await axios.get("/api/sales", { withCredentials: true });
    return response.data.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
