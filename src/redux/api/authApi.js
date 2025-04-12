
import { baseApi } from "./baseApi"
const AUTH_URL = "/auth";


export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
        query: (loginData) => (
          {
            url:`${AUTH_URL}/login`,
            method: "POST",
            data: loginData
        }
      ),
        invalidatesTags:['user']
    }),
    userSignup: build.mutation({
        query: (signupData) => (
          {
            url:`${AUTH_URL}/signup`,
            method: "POST",
            data: signupData
        }
      ),
        invalidatesTags:['user']
    }),
    forgotPassword: build.mutation({
        query: (email) => (
          {
            url:`${AUTH_URL}/forgot-password`,
            method: "POST",
            data: email
        }
      ),
        invalidatesTags:['user']
    }),
  }),
  
})

export const { useUserLoginMutation , useUserSignupMutation,useForgotPasswordMutation} = authApi