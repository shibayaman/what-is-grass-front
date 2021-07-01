import Link from 'next/link';
import Layout from '../components/Layout';
import { greet, useDispatch, useSelector, dummy } from '@what-is-grass/shared';
import { useState, useEffect } from 'react';

const IndexPage: React.FC = () => {
  const [user, setUser] = useState('World');
  const indices = useSelector((state) => state.questions.indices);

  const dispatch = useDispatch();

  useEffect(() => {
    const callApi = async () => {
      const res = await fetch('/user');
      const data = await res.json();
      setUser(data.username);
    };

    callApi();
  }, []);

  return (
    <Layout title="Home">
      <h1>{greet(user)}</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
        <br />
        <button
          type="button"
          onClick={() => {
            dispatch(dummy());
          }}
        >
          dispatch questions/dummy
        </button>
        <pre>{JSON.stringify(indices, null, 2)}</pre>
      </p>
    </Layout>
  );
};

export default IndexPage;
