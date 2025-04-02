
import { baseApi } from "./baseApi"
const url = "/slider";


export const sliderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sliderCreate: build.mutation({
        query: (data) => (
          {
            url:`${url}/create`,
            method: "POST",
            data,
            contentType: "multipart/form-data"
        }
      )
    }),
    sliderList: build.query({
      query: () => ({
        url: `${url}/list`,
        method: "GET",
      }),
    }),
    sliderDelete: build.mutation({
      query: (id) => ({
        url: `${url}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  
})

export const { useSliderCreateMutation,useSliderListQuery,useSliderDeleteMutation } = sliderApi