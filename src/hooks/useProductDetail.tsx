import { useState } from 'react';
import { useGetProductDetailQuery, useAddProductMutation } from '../core/services/shopCartApi';
import { setTotalElements } from '../core/store/cartSlice';
import { useAppDispatch } from '../core/store/store';

export const useProductDetail = (id: string) => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProductDetailQuery(id);
  const [postCart] = useAddProductMutation();

  const [size, setSize] = useState(data?.sizes[0] || 'XS');
  const [amount, setAmount] = useState(1);
  const handleChangeSize = (e: React.ChangeEvent<HTMLSelectElement>) => setSize(e.target.value);
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAmount(Number(e.target.value));

  const handleAdd = async () => {
    try {
      const res = await postCart({ id: Number(id), size, total: amount });
      if (res.data) dispatch(setTotalElements(res.data.count));
    } catch {
      alert('there was an error while adding to the cart. Please, try it later');
    }
  };
  return {
    handleAdd,
    data,
    isLoading,
    size,
    amount,
    handleChangeSize,
    handleChangeAmount,
  };
};
