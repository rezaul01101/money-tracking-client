import { baseApi } from "./baseApi";
const url = "/settings";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    updateSettings: build.mutation({
      query: (data) => ({
        url: `${url}/update`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["settings"],
    }),
    getSettings: build.query({
      query: () => ({
        url: `${url}`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
  }),
});

export const {
  useUpdateSettingsMutation,
  useGetSettingsQuery
} = settingsApi;
