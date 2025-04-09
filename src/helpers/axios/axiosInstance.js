import { authKey } from "@/src/constants/storageKey";
import { getFromLocalStorage } from "@/src/utils/local-storage";

import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const responseObject = {
      data: response?.data?.data,
    };
    return responseObject;
  },
  async function (error) {
    // console.log(error)
    if (error?.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return Promise.reject({
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error?.request) {
      // The request was made but no response was received
      return Promise.reject({
        status: "FETCH_ERROR",
        data: { message: "Network error. Please check your connection." },
      });
    } else {
      return Promise.reject({
        status: "ERROR",
        data: { message: error.message || "Something went wrong" },
      });
    }
  }
);

export { instance };
