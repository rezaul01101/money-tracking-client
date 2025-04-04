import { baseApi } from "./baseApi";
const url = "/transaction";

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    transactionCreate: build.mutation({
      query: (transactionData) => ({
        url: `${url}/create`,
        method: "POST",
        data: transactionData,
      }),
      invalidatesTags: ["transaction"],
    }),
    transactionListByType: build.query({
      query: (type) => ({
        url: `${url}/list/${type}`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const {
  useTransactionCreateMutation,
  useTransactionListByTypeQuery
} = transactionApi;
