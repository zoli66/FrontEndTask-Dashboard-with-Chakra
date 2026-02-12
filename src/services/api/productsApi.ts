import { baseApi } from "./baseApi";
import type { Product } from "../../types/product";

interface ProductsResponse {
    products: Product[];
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