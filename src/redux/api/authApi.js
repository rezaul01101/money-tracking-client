
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
    verifyOtp: build.mutation({
        query: (data) => (
          {
            url:`${AUTH_URL}/verify-otp`,
            method: "POST",
            data: data
        }
      ),
        invalidatesTags:['user']
    }),
    resetPassword: build.mutation({
        query: (data) => (
          {
            url:`${AUTH_URL}/reset-password`,
            method: "POST",
            data: data
        }
      ),
        invalidatesTags:['user']
    }),
    emailVerificaitonToken: build.mutation({
        query: (data) => (
          {
            url:`${AUTH_URL}/varification-token-check`,
            method: "POST",
            data: data
        }
      ),
    }),
  }),
  
})

export const { 
  useUserLoginMutation , 
  useUserSignupMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useEmailVerificaitonTokenMutation
} = authApi