import { baseApi } from "./api/baseApi";
import { categorySlice } from "./features/categorySlice";
import userSlice from "./features/user/userSlice";


export const reducer = {
   [baseApi.reducerPath]: baseApi.reducer,
   user: userSlice,
   category: categorySlice,
}
