import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { setupStore } from './core/store/store';

vi.mock('./pages/ProductList/ProductList', () => ({
  default: () => <div>Product List Mock</div>,
}));

vi.mock('./pages/ProductDetail/ProductDetail', () => ({
  default: () => <div>Product Detail Mock</div>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={setupStore()}>
        <App />
      </Provider>
    );
    expect(document.querySelector('div')).toBeInTheDocument();
  });
});
