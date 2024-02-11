"use client";

import axios, { InternalAxiosRequestConfig } from "axios";
import { toast } from "react-toastify";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_API,
});

httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    Object.assign(config.headers, {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
    return config;
  },
  (err: any) => {
    Object.assign(err, {
      error: err.message,
    });
    return Promise.reject(err);
  },
);

httpClient.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (err: any) => {
    if (!err.response) {
      Object.assign(err, {
        error: err.message,
      });
      return Promise.reject(err);
    }
    if (err.response.status === 403) {
      toast.warning("Your token is expired. Please login again!");
      localStorage.clear();
      window.location.href = "/sign-in";
    }
    return Promise.reject(err.response.data);
  },
);

export default httpClient;
