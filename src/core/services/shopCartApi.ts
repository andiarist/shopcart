import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Pagination, Product } from '../types/types';

export const shopCartApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  refetchOnMountOrArgChange: true,
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
      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs.search}`,

      merge: (currentCache, newData) => {
        currentCache.data.push(...newData.data);
        currentCache.pageData.page = newData.pageData.page;
        currentCache.pageData.limit = newData.pageData.limit;
        currentCache.pageData.total = newData.pageData.total;
        currentCache.pageData.totalPages = newData.pageData.totalPages;
      },

      forceRefetch({ currentArg, previousArg }) {
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
