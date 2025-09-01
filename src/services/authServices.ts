import axios, { AxiosError } from "axios";
import { LoginType, SignupType } from "@/types";
import { changePasswordType } from "@/components/ChangePasswordForm";

export const login = async (data: LoginType) => {
  try {
    const response = await axios.post("/api/auth/login", data, {
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

export const signup = async (data: SignupType) => {
  try {
    const response = await axios.post("/api/auth/signup", data, {
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

export const logout = async () => {
  try {
    const response = await axios.post(
      "/api/auth/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get("/api/auth/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response?.status === 401) {
      return { success: false, data: null };
    }

    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const changePassword = async (data: changePasswordType) => {
  try {
    const response = await axios.put("/api/auth/new-password", data, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error?.response?.data) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
