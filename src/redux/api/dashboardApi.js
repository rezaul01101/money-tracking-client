import { baseApi } from "./baseApi";
const url = "/dashboard";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
     dashboard: build.query({
      query: () => ({
        url: `${url}`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useDashboardQuery
} = dashboardApi;
