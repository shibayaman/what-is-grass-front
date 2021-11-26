// import { useGetFavoriteIndicesQuery } from '@what-is-grass/shared';
import Card from '../components/Card';
// import IndexItem from '../components/IndexItem';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';

const FavoritePage: React.FC = () => {
  // const { data, isLoading } = useGetFavoriteIndicesQuery({});
  return (
    <PrivatePage redirectTo="/">
      <Layout title="Favorites | What Is Grass">
        <h1 className="text-3xl p-3">お気に入り登録した見出し</h1>
        <div className="flex justify-center">
          <Card>
            お気に入り機能はバグが見つかったためデモ版では無効化しています。
          </Card>
        </div>
        {/* <div className="p-10 w-2/4">
          {data &&
            data.map((index) => <IndexItem key={index.id} question={index} />)}
          {isLoading && 'ロード中'}
        </div> */}
      </Layout>
    </PrivatePage>
  );
};

export default FavoritePage;
