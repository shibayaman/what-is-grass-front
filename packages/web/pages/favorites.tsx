import { useGetFavoriteIndicesQuery } from '@what-is-grass/shared';
import IndexItem from '../components/IndexItem';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';

const IndexPage: React.FC = () => {
  const { data, isLoading } = useGetFavoriteIndicesQuery({});
  console.log(data);
  return (
    <PrivatePage redirectTo="/">
      <Layout title="Favorites | What Is Grass">
        <div className="p-10 w-2/4">
          {data &&
            data.map((index) => <IndexItem key={index.id} question={index} />)}
          {isLoading && 'ロード中'}
        </div>
      </Layout>
    </PrivatePage>
  );
};

export default IndexPage;
