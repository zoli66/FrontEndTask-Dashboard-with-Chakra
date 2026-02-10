import type { User } from "../../types/user";
import { baseApi } from "./baseApi";

interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<UsersResponse, {limit?: number; skip?: number}>({
            query: ({limit = 10, skip = 0}) => `/users?limit=${limit}&skip=${skip}`,
            providesTags: ["Users"],
        }),

        getUserById: builder.query<User, number>({
            query: (id) => `/users/${id}`,
        }),

        createUser: builder.mutation<User, Partial<User>>({
            query: (body) => ({
                url: "/users/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Users"],
        }),

        updateUser: builder.mutation<User, {id:number} & Partial<User>>({
            query: (id , ...body) => ({
                url: `/users/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Users"],
        }),

        deleteUser: builder.mutation<{isDeleted: boolean}, number>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;