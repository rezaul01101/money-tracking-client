import { baseApi } from "./api/baseApi";
import { categorySlice } from "./features/categorySlice";
import userSlice from "./features/user/userSlice";
import settingsSlice from "./features/settingsSlice";


export const reducer = {
   [baseApi.reducerPath]: baseApi.reducer,
   user: userSlice,
   category: categorySlice,
   settings: settingsSlice,
}
