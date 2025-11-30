import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAddProductMutation, useGetProductDetailQuery } from '../core/services/shopCartApi';
import { useAppDispatch } from '../core/store/store';
import { Product } from '../core/types/types';
import { ProviderTestWrapper } from '../test/providers';
import { useProductDetail } from './useProductDetail';

vi.mock('../core/services/shopCartApi', async () => {
  const actual = await vi.importActual('../core/services/shopCartApi');
  return {
    ...actual,
    useGetProductDetailQuery: vi.fn(),
    useAddProductMutation: vi.fn(),
  };
});
vi.mock('../core/store/store', async () => {
  const actual = await vi.importActual('../core/store/store');
  return {
    ...actual,
    useAppDispatch: vi.fn(),
  };
});
const dataMocked: Product = {
  id: 1,
  reference: 'ref',
  name: 'name',
  description: 'description',
  mediaUrl: 'mediaUrl',
  otherMediaUrl: ['otherMediaUrl_01', 'otherMediaUrl_02'],
  sizes: ['XS', 'S', 'M'],
  price: 100,
};

const queryProps = {
  isLoading: false,
  isFetching: false,
  isError: false,
  refetch: vi.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return <ProviderTestWrapper>{children}</ProviderTestWrapper>;
};
describe('useProductDetail', () => {
  const dispatch = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAppDispatch).mockReturnValue(dispatch);
    vi.mocked(useGetProductDetailQuery).mockReturnValue({
      ...queryProps,
      data: dataMocked,
    });
    vi.mocked(useAddProductMutation).mockReturnValue([
      vi.fn(),
      { reset: vi.fn(), isLoading: false },
    ]);
  });

  it('initializes with query data, default size and amount', () => {
    const { result } = renderHook(() => useProductDetail('1'), { wrapper });

    expect(useGetProductDetailQuery).toHaveBeenCalledWith('1');

    expect(result.current.size).toBe(dataMocked.sizes[0]);

    expect(result.current.amount).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });
  it('handleChangeSize updates size', () => {
    const { result } = renderHook(() => useProductDetail('1'), { wrapper });

    expect(result.current.size).toBe('XS');

    act(() => {
      result.current.handleChangeSize({
        target: { value: 'M' },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(result.current.size).toBe('M');
  });

  it('handleChangeAmount updates amount as a number', () => {
    const { result } = renderHook(() => useProductDetail('1'), { wrapper });

    expect(result.current.amount).toBe(1);
    const mockEvent = { target: { value: '3' } } as React.ChangeEvent<HTMLInputElement>;
    act(() => {
      result.current.handleChangeAmount(mockEvent);
    });

    expect(result.current.amount).toBe(3);
  });
  it('handleAdd calls postCart with proper payload', () => {
    const postCartMock = vi.fn().mockReturnValue({
      unwrap: vi.fn().mockResolvedValue({ res: { data: { count: 4 } } }),
    });
    vi.mocked(useAddProductMutation).mockReturnValue([
      postCartMock,
      { reset: vi.fn(), isLoading: false },
    ]);

    const { result } = renderHook(() => useProductDetail('1'), { wrapper });

    act(() => {
      result.current.handleAdd();
    });

    expect(postCartMock).toHaveBeenCalledWith({
      id: 1,
      size: 'XS',
      total: 1,
    });
  });
});
