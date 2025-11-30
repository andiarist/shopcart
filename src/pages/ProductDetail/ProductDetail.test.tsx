import ProductDetail from './ProductDetail';
import { useProductDetail } from '../../hooks/useProductDetail';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Product } from '../../core/types/types';
import { ProviderTestWrapper } from '../../test/providers';
import userEvent from '@testing-library/user-event';

const productId = 1;

vi.mock('../../hooks/useProductDetail', async () => {
  const actual = await vi.importActual('../../hooks/useProductDetail');
  return {
    ...actual,
    useProductDetail: vi.fn(),
  };
});

const handleAddMocked = vi.fn();
const handleChangeSizeMocked = vi.fn();
const handleChangeAmountMocked = vi.fn();

const dataMocked: Product = {
  id: productId,
  reference: 'ref',
  name: 'name',
  description: 'description',
  mediaUrl: 'mediaUrl',
  otherMediaUrl: ['otherMediaUrl_01', 'otherMediaUrl_02'],
  sizes: ['XS', 'S', 'M'],
  price: 100,
};
const hookReturnMock = {
  handleAdd: handleAddMocked,
  data: dataMocked,
  isLoading: false,
  size: 'XS',
  amount: 1,
  handleChangeSize: handleChangeSizeMocked,
  handleChangeAmount: handleChangeAmountMocked,
};

describe('ProductDetail test', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  vi.mocked(useProductDetail).mockReturnValue(hookReturnMock);
  it('Renders loading state when isLoading is true', () => {
    vi.mocked(useProductDetail).mockReturnValue({ ...hookReturnMock, isLoading: true });

    render(
      <ProviderTestWrapper>
        <ProductDetail />
      </ProviderTestWrapper>
    );

    expect(screen.getByText(/Detail View/i)).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('Renders error state when not loading and data is null/undefined', () => {
    vi.mocked(useProductDetail).mockReturnValue({ ...hookReturnMock, data: undefined });

    render(
      <ProviderTestWrapper>
        <ProductDetail />
      </ProviderTestWrapper>
    );

    expect(screen.getByText(/Detail View/i)).toBeInTheDocument();
    expect(screen.getByText(/There was an error, please try it later/i)).toBeInTheDocument();
  });
  it('Renders product data when data is available', () => {
    vi.mocked(useProductDetail).mockReturnValue(hookReturnMock);
    render(
      <ProviderTestWrapper>
        <ProductDetail />
      </ProviderTestWrapper>
    );

    expect(screen.getByText(`Ref: ${dataMocked.reference}`)).toBeInTheDocument();
    expect(screen.getByText(dataMocked.name)).toBeInTheDocument();
    expect(screen.getByText(`${dataMocked.price / 100} EUR`)).toBeInTheDocument();
  });
  it('Select size change triggers handleChangeSize', () => {
    vi.mocked(useProductDetail).mockReturnValue(hookReturnMock);
    render(
      <ProviderTestWrapper>
        <ProductDetail />
      </ProviderTestWrapper>
    );

    const select = screen.getByLabelText(/Select size:/i) as HTMLSelectElement;

    expect(select.value).toBe(hookReturnMock.size);

    fireEvent.change(select, { target: { value: 'M' } });

    expect(handleChangeSizeMocked).toHaveBeenCalledTimes(1);
  });
  it('Changing quantity input triggers handleChangeAmount', () => {
    vi.mocked(useProductDetail).mockReturnValue(hookReturnMock);
    render(
      <ProviderTestWrapper>
        <ProductDetail />
      </ProviderTestWrapper>
    );

    const input = screen.getByLabelText(/Quantity:/i) as HTMLInputElement;

    expect(input.value).toBe(String(hookReturnMock.amount));
    expect(input.min).toBe('1');

    fireEvent.change(input, { target: { value: '3' } });

    expect(handleChangeAmountMocked).toHaveBeenCalledTimes(1);
  });
  it('Clicking "Add to car" button calls handleAdd', async () => {
    vi.mocked(useProductDetail).mockReturnValue(hookReturnMock);
    render(
      <ProviderTestWrapper>
        <ProductDetail />
      </ProviderTestWrapper>
    );

    const button = screen.getByRole('button', { name: /Add to car/i });

    await userEvent.click(button);

    expect(handleAddMocked).toHaveBeenCalledTimes(1);
  });
});
