import { baseApi } from "./baseApi";
const url = "/ai";

export const askAiApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    askAi: build.mutation({
      query: (data) => ({
        url: `${url}/ask`,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const {
  useAskAiMutation
} = askAiApi;
