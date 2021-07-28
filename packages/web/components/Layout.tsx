import {
  loggedOut,
  useDispatch,
  useLogoutMutation,
  useSelector,
} from '@what-is-grass/shared';
import Head from 'next/head';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title = 'default title' }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const onLogoutHandler = async () => {
    try {
      await logout();
      dispatch(loggedOut());
    } catch (err) {
      //
    }
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-green-500 px-2 py-4 flex justify-between">
        <Link href="/">
          <a>
            <img src="./logo.png" className="w-52" />
          </a>
        </Link>
        {user ? (
          <div>
            {user.username}{' '}
            <button
              type="button"
              onClick={() => onLogoutHandler()}
              disabled={isLoading}
            >
              ログアウト
            </button>
          </div>
        ) : (
          <Link href="/">ログイン</Link>
        )}
      </header>
      {children}
    </div>
  );
};

export default Layout;
