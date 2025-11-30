import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProductList } from './useProductList';
import { useGetProductsListQuery } from '../core/services/shopCartApi';
import { Product, Pagination } from '../core/types/types';
import { ProviderTestWrapper } from '../test/providers';

vi.mock('../core/services/shopCartApi', async () => {
  const actual = await vi.importActual('../core/services/shopCartApi');
  return {
    ...actual,
    useGetProductsListQuery: vi.fn(),
  };
});
const dataMocked: Product[] = [
  {
    id: 1,
    reference: 'ref',
    name: 'name',
    description: 'description',
    mediaUrl: 'mediaUrl',
    otherMediaUrl: ['otherMediaUrl_01', 'otherMediaUrl_02'],
    sizes: ['XS', 'S', 'M'],
    price: 100,
  },
];
const paginationMocked: Pagination = {
  page: 1,
  limit: 1,
  total: 1,
  totalPages: 1,
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

describe('useProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Initializes with default values and calls query with initial params', () => {
    vi.mocked(useGetProductsListQuery).mockReturnValue({
      ...queryProps,
      data: { data: dataMocked, pageData: paginationMocked },
    });

    const { result } = renderHook(() => useProductList(), { wrapper });
    expect(result.current.page).toBe(1);
    expect(result.current.search).toBe('');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ data: dataMocked, pageData: paginationMocked });

    expect(useGetProductsListQuery).toHaveBeenCalledWith(
      {
        page: 1,
        limit: 40,
        search: '',
      },
      { skip: false }
    );
  });

  it('handleSearch updates search value and resets page to 1 via effect', () => {
    vi.mocked(useGetProductsListQuery).mockReturnValue({
      ...queryProps,
      data: { data: dataMocked, pageData: paginationMocked },
    });

    const { result, rerender } = renderHook(() => useProductList(), { wrapper });
    const mockEvent = { target: { value: 'shirt' } } as React.ChangeEvent<HTMLInputElement>;

    act(() => {
      result.current.handleSearch(mockEvent);
    });

    rerender();

    expect(result.current.search).toBe('shirt');

    expect(result.current.page).toBe(1);

    expect(useGetProductsListQuery).toHaveBeenLastCalledWith(
      {
        page: 1,
        limit: 40,
        search: 'shirt',
      },
      { skip: false }
    );
  });
});
