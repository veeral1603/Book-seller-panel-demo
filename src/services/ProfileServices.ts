import { FormData } from "@/components/EditProfileInfoForm";
import { AxiosError } from "axios";
import axios from "axios";

export const getProfile = async () => {
  try {
    const response = await axios.get("/api/profile");
    return response.data.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await axios.put("/api/profile", data);
    return response.data.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
