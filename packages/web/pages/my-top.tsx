import { FC } from 'react';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';

const MyTopPage: FC = () => {
  return (
    <PrivatePage redirectTo="/">
      <Layout>
        <div>My Top Page</div>
      </Layout>
    </PrivatePage>
  );
};

export default MyTopPage;
