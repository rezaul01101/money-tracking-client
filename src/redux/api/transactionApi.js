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
      invalidatesTags: ["transaction", "paymentMethod", "category"],
    }),
    transactionUpdate: build.mutation({
      query: (transactionData) => ({
        url: `${url}/update`,
        method: "POST",
        data: transactionData,
      }),
      invalidatesTags: ["transaction", "paymentMethod", "category"],
    }),
    transactionListByType: build.query({
      query: (params) => {
        const { type, page, limit } = params;
        return {
          url: `${url}/list/${type}`,
          method: "GET",
          params: {
            page,
            limit,
          },
        };
      },
      providesTags: ["transaction", "paymentMethod"],
    }),
    transactionList: build.query({
      query: () => ({
        url: `${url}/list`,
        method: "GET",
      }),
      providesTags: ["transaction"],
    }),
    transactionDelete: build.mutation({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
    fullYearIncomExpense: build.query({
      query: (year) => ({
        url: `${url}/full-year-income-expense/${year}`,
        method: "get",
      }),
    }),
  }),
});

export const {
  useTransactionCreateMutation,
  useTransactionListByTypeQuery,
  useTransactionListQuery,
  useTransactionDeleteMutation,
  useTransactionUpdateMutation,
  useFullYearIncomExpenseQuery
} = transactionApi;
