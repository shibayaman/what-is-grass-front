import AnswerItem from '../../components/AnswerItem';
import Layout from '../../components/Layout';
import { useLazyGetAnswersQuery, useSelector } from '@what-is-grass/shared';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';

const QuestionAnswer: React.FC = () => {
  const [triggerGetAnswersQuery, { data, isLoading }] =
    useLazyGetAnswersQuery();
  const user = useSelector((state) => state.auth.user);

  const { query, isReady, push: routerPush } = useRouter();
  const indexId = query.id as string;

  useEffect(() => {
    if (isReady) {
      triggerGetAnswersQuery({ index_id: +indexId });
    }
  }, [isReady]);

  const handleNewAnswerClick = () => {
    routerPush(`/new-answer/${indexId}`);
  };

  const makeNewAnswerButton = () => {
    if (!indexId) {
      return null;
    }

    return user ? (
      <div>
        <button type="button" onClick={handleNewAnswerClick}>
          この見出しに回答する
        </button>
      </div>
    ) : (
      <Link href="/">回答するにはログインしてください</Link>
    );
  };

  return (
    <Layout>
      <h1>ここは質問回答覧</h1>
      {makeNewAnswerButton()}
      {data &&
        data.map((answer) => (
          <AnswerItem key={answer.answer_id} answer={answer} />
        ))}
      {isLoading ? 'ロード中...' : null}
    </Layout>
  );
};

export default QuestionAnswer;
