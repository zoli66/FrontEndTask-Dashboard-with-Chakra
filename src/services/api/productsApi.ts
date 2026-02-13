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
        getProductById: builder.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: (result, error, id) => [{ type: "Products", id }],
        }),
        createProduct: builder.mutation<Product, Partial<Product>>({
            query: (body) => ({
                url: "/products/add",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation<Product, {id: number} & Partial<Product>>({
            query: ({id, ...body}) => ({
                url: `/products/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<{isDeleted: boolean}, number>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
 } = productsApi;