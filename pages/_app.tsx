import { store } from '@/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { NextPageWithLayout } from './page';

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
