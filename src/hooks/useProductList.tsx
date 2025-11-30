import { useState, useEffect } from 'react';
import { useGetProductsListQuery } from '../core/services/shopCartApi';

export const useProductList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useGetProductsListQuery({
    page,
    limit: 40,
    search,
  });
  useEffect(() => {
    console.log('dentro del efecto de busqueda');
    setPage(1);
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  const loadMoreProducts = () => setPage((p) => p + 1);
  return { data, isLoading, search, handleSearch, page, loadMoreProducts };
};
