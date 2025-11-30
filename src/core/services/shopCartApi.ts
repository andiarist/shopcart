import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pagination, Product } from '../types/types';

export const shopCartApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
  endpoints: (build) => ({
    getProductsList: build.query<
      { pageData: Pagination; data: Product[] },
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search = '', page = 1, limit = 10 }) => ({
        url: '/api/product',
        method: 'GET',
        params: { search, page, limit },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs.search ?? ''}-${queryArgs.page ?? 1}`,

      forceRefetch({ currentArg, previousArg }) {
        if (!previousArg) return false;
        return currentArg?.page !== previousArg?.page;
      },

      keepUnusedDataFor: 3600,
    }),
    getProductDetail: build.query({
      query: (id: string) => `/api/product/${id}`,
    }),
    addProduct: build.mutation<{ count: number }, { id: number; size: string; total: number }>({
      query: (body) => ({
        url: '/api/cart',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetProductDetailQuery,
  useGetProductsListQuery,
  useLazyGetProductsListQuery,
  useAddProductMutation,
} = shopCartApi;
