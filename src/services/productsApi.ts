import { baseApi } from "./api/baseApi";

interface ProductsResponse {
    products: any[];
    total: number;
}

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, void>({
            query: () => "products",
            providesTags: ["Products"],
        }),
    })
})

export const { useGetProductsQuery } = productsApi;