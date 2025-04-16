import { baseApi } from "./baseApi";
const url = "/payment-method";

export const paymentMethodApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    paymentMethodCreate: build.mutation({
      query: (data) => ({
        url: `${url}/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["paymentMethod"],
    }),
    paymentMethodUpdate: build.mutation({
      query: (data) => ({
        url: `${url}/update`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["paymentMethod"],
    }),
    paymentMethodList: build.query({
      query: () => ({
        url: `${url}/list`,
        method: "GET",
      }),
      providesTags: ["paymentMethod"],
    }),
    paymentMethodDelete: build.mutation({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["paymentMethod"],
    }),
  }),
});

export const {
  usePaymentMethodCreateMutation,
  usePaymentMethodListQuery,
  usePaymentMethodUpdateMutation,
  usePaymentMethodDeleteMutation
} = paymentMethodApi;
