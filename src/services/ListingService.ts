import { ListingType } from "@/types";
import axios, { AxiosError } from "axios";

export const createListing = async (data: ListingType) => {
  try {
    const response = await axios.post("/api/listings", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getListings = async () => {
  try {
    const response = await axios.get("/api/listings", {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
