import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { RootState, setupStore } from '../core/store/store';

interface ITestWrapper {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}

export const ProviderTestWrapper = ({ children, preloadedState }: ITestWrapper) => {
  return (
    <Provider store={preloadedState ? setupStore(preloadedState) : setupStore()}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
};
