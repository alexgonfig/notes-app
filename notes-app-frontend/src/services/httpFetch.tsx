import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use the environment variable here
  headers: { "Content-Type": "application/json" },
});

const fetchFromBackend = async <T = any,>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  data?: T | null,
  config?: AxiosRequestConfig,
  signal?: AbortSignal
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
    console.error(
      "Error during API call:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data.message ||
        error.message ||
        "Ocurrio un problema durante la operación..."
    ); // propagate the error for the caller to handle
  }
};

export { fetchFromBackend };
