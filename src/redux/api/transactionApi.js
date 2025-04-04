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
      // invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useTransactionCreateMutation,
} = transactionApi;
