import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './core/store/store';

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
