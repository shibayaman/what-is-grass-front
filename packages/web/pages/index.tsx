import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from '@what-is-grass/shared';
import Layout from '../components/Layout';
import Login from '../components/Login';

const IndexPage: React.FC = () => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user !== null) {
      router.replace('/my-top');
    }
  }, [user, router]);

  return (
    <Layout title="Home">
      <h1 className="text-xl border-black border-2">Top Page</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <br />
      <Login />
    </Layout>
  );
};

export default IndexPage;
