import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "redux";
import { logout } from "../store/slices/authSlice"; // import the logout action

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use the environment variable here
  headers: { "Content-Type": "application/json" },
});

const fetchFromBackend = async <T = any,>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: T | null,
  config?: AxiosRequestConfig,
  signal?: AbortSignal,
  dispatch?: Dispatch
) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error("Environment variable 'REACT_APP_API_URL' is not defined");
  }

  try {
    const response = await axiosInstance.request({
      url,
      method,
      data: data || undefined,
      signal,
      ...config,
    });

    return response.data; // Return only the response data
  } catch (error: any) {
    console.log(error.response.data);

    // Handle 401 Unauthorized error and dispatch logout action
    if (error.response?.status === 401) {
      // Dispatch logout when unauthorized
      if (dispatch) {
        dispatch(logout());
      }
    }

    if (error.response.data.errors) {
      throw new Error(
        error.response.data.errors[0].message.replace("Value error, ", "")
      );
    }

    if (error.response.data.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error(
      error.message || "Ocurrio un problema durante la operación..."
    ); // propagate the error for the caller to handle
  }
};

export { fetchFromBackend };
