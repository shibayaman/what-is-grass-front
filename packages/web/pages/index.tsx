import Link from 'next/link';
import GuestOnlyPage from '../components/GuestOnlyPage';
import Layout from '../components/Layout';
import Login from '../components/Login';

const IndexPage: React.FC = () => {
  return (
    <GuestOnlyPage redirectTo="/my-top">
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
    </GuestOnlyPage>
  );
};

export default IndexPage;
