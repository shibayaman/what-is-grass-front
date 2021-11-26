// import { store, worker } from '@what-is-grass/shared';
import { store } from '@what-is-grass/shared';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import WithUser from '../components/WithUser';
import '../styles/globals.css';
import 'react-tabs/style/react-tabs.css';

// if (process.env.NODE_ENV === 'development') {
//   if (typeof window !== 'undefined') {
//     worker().start({ onUnhandledRequest: 'bypass' });
//   }
// }

const CustomApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <WithUser>
        <Component {...pageProps} />
      </WithUser>
    </Provider>
  );
};

export default CustomApp;
