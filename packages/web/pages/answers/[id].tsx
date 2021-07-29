import { useLazyGetAnswersQuery, useSelector } from '@what-is-grass/shared';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AnswerItem from '../../components/AnswerItem';
import Button from '../../components/Button';
import Layout from '../../components/Layout';

const AnswersPage: React.FC = () => {
  const [triggerGetAnswersQuery, { data, isLoading }] =
    useLazyGetAnswersQuery();
  const user = useSelector((state) => state.auth.user);

  const { query, push: routerPush } = useRouter();
  const indexId = query.id as string;

  useEffect(() => {
    if (indexId) {
      triggerGetAnswersQuery({ index_id: +indexId });
    }
  }, [indexId, triggerGetAnswersQuery]);

  const handleNewAnswerClick = () => {
    routerPush(`/new-answer/${indexId}`);
  };

  const makeNewAnswerButton = () => {
    if (!indexId) {
      return null;
    }

    return (
      <div className="m-4 flex justify-end">
        {user ? (
          <div className="flex space-x-2">
            <Button
              variant="primary-outline"
              type="button"
              onClick={handleNewAnswerClick}
            >
              この見出しに回答する
            </Button>
            <Button
              variant="accent-outline"
              type="button"
              onClick={() => {
                //
              }}
            >
              お気に入りに追加
            </Button>
          </div>
        ) : (
          <div className="bg-red-100 rounded p-3 border border-red-400">
            <Link href="/">
              <a className="text-green-600">ログイン</a>
            </Link>
            するとこの見出しに回答したり、お気に入りに登録できます
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      {makeNewAnswerButton()}
      <div className="flex justify-center mb-6">
        <div className="grid grid-cols-5 gap-6 w-9/12">
          {isLoading ? 'ロード中...' : null}
          <div className="flex flex-col gap-4 col-span-3">
            {data &&
              data.map((answer, index) => (
                <AnswerItem
                  key={answer.id}
                  answer={answer}
                  featured={index === 0}
                />
              ))}
          </div>
          <div className="flex flex-col gap-4 col-span-2 rounded py-4 px-6 border border-gray-300">
            <span>例文</span>
            {[
              '私は私の前で泣かないでください',
              '私は私の前で泣かないでください',
              '私は私の前で泣かないでください',
              '私は私の前で泣かないでください',
              '私は私の前で泣かないでください',
            ].map((e, index) => (
              <p key={index}>{e}</p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnswersPage;
