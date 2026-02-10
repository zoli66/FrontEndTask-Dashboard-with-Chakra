import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store/store";

export const baseApi = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com/",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token;

            if (token) {
                headers.set("Authorization" , `Bearer${token}`);
            }
            return headers;
        }
    }),
    endpoints: ()=> ({})
});