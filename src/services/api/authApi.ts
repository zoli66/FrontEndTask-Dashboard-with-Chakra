import { baseApi } from "./baseApi";
import { type LoginResponse } from "../../types/auth";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder)=> ({
        login: builder.mutation<LoginResponse, {username: string; password: string}>({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials,
            })
        })
    })
});

export const {useLoginMutation} = authApi;