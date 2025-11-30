import { useState, useEffect } from 'react';
import { useGetProductsListQuery } from '../core/services/shopCartApi';
import { Product } from '../core/types/types';

export const useProductList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const skipQuery = search !== '' && page !== 1;

  const { data, isLoading, isError } = useGetProductsListQuery(
    {
      page,
      limit: 40,
      search,
    },
    { skip: skipQuery }
  );
  useEffect(() => {
    setPage(1);
    setAllProducts([]);
  }, [search]);

  const loadMoreProducts = () => {
    setPage((p) => p + 1);
  };
  useEffect(() => {
    if (data?.data) {
      setAllProducts((prev) => [...prev, ...data.data]);
    }
  }, [data]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return { data, isLoading, search, handleSearch, isError, page, loadMoreProducts, allProducts };
};
