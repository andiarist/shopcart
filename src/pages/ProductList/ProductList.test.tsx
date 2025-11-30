import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Pagination, Product } from '../../core/types/types';
import { useProductList } from '../../hooks/useProductList';
import { ProviderTestWrapper } from '../../test/providers';
import ProductList from './ProductList';

vi.mock('../../hooks/useProductList', async () => {
  const actual = await vi.importActual('../../hooks/useProductList');
  return {
    ...actual,
    useProductList: vi.fn(),
  };
});

const handleSearchMocked = vi.fn();
const loadMoreProductsMocked = vi.fn();

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
const hookReturnMock = {
  data: { data: dataMocked, pageData: paginationMocked },
  isLoading: false,
  search: '',
  page: 1,
  handleSearch: handleSearchMocked,
  loadMoreProducts: loadMoreProductsMocked,
  allProducts: dataMocked,
  isError: false,
};

describe('ProductList test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mocked(useProductList).mockReturnValue(hookReturnMock);
  it('Renders header and loading state when isLoading is true', () => {
    vi.mocked(useProductList).mockReturnValue({ ...hookReturnMock, isLoading: true });

    render(
      <ProviderTestWrapper>
        <ProductList />
      </ProviderTestWrapper>
    );

    expect(screen.getByText(/List View/i)).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search product\.\.\./i);
    expect(searchInput).toBeInTheDocument();
    expect((searchInput as HTMLInputElement).value).toBe('');
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('Renders product cards when data is available and not loading', () => {
    vi.mocked(useProductList).mockReturnValue({ ...hookReturnMock });

    render(
      <ProviderTestWrapper>
        <ProductList />
      </ProviderTestWrapper>
    );

    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();

    dataMocked.forEach((p) => {
      expect(screen.getByText(p.name.toLowerCase(), { exact: false })).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`${p.price / 100} EUR`))).toBeInTheDocument();
      const img = screen.getByRole('img', { name: '' }) as HTMLImageElement;
      expect(img).toBeInTheDocument();
    });

    const links = screen.getAllByRole('link');
    const cardLinks = links.filter((l) => l.className.includes('card_hover'));
    expect(cardLinks).toHaveLength(dataMocked.length);
    dataMocked.forEach((p, index) => {
      expect(cardLinks[index].getAttribute('href')).toBe(`/${p.id}`);
    });
  });
  it('Search input change triggers handleSearch with event', () => {
    vi.mocked(useProductList).mockReturnValue({ ...hookReturnMock });

    render(
      <ProviderTestWrapper>
        <ProductList />
      </ProviderTestWrapper>
    );

    const searchInput = screen.getByPlaceholderText(/Search product\.\.\./i) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'shirt' } });

    expect(handleSearchMocked).toHaveBeenCalledTimes(1);
  });
  it('Disables "Load more" button when current page >= total pages', () => {
    vi.mocked(useProductList).mockReturnValue({ ...hookReturnMock });

    render(
      <ProviderTestWrapper>
        <ProductList />
      </ProviderTestWrapper>
    );

    const button = screen.getByRole('button', { name: /Load more\.\.\./i });
    expect(button).toBeDisabled();
  });
});
