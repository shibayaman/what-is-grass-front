import Link from 'next/link';
import { FC } from 'react';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';

const MyTopPage: FC = () => {
  return (
    <PrivatePage redirectTo="/">
      <Layout>
        <div>My Top Page</div>
        <Link href="/favorites">
          <a className="text-green-600">お気に入り一覧</a>
        </Link>
      </Layout>
    </PrivatePage>
  );
};

export default MyTopPage;
