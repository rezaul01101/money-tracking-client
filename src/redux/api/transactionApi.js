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
      invalidatesTags: ["transaction","paymentMethod","category"],
    }),
    transactionListByType: build.query({
      query: (type) => ({
        url: `${url}/list/${type}`,
        method: "GET",
      }),
      providesTags: ["transaction","paymentMethod"],
    }),
    transactionList: build.query({
      query: () => ({
        url: `${url}/list`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const {
  useTransactionCreateMutation,
  useTransactionListByTypeQuery,
  useTransactionListQuery
} = transactionApi;
