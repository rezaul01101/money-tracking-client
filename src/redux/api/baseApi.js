import { axiosBaseQuery } from "@/src/helpers/axios/axiosBaseQuery";
import { getBaseUrl } from "@/src/helpers/config/envConfig";
import { createApi } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: () => ({}),
  tagTypes: ["user", "category", "transaction","settings","paymentMethod","dashboard"],
});
