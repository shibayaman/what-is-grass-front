import AnswerItem from '../../components/AnswerItem';
import { useLazyGetAnswersQuery } from '@what-is-grass/shared';
import router, { useRouter } from 'next/router';
import { useEffect } from 'react';

const QuestionAnswer: React.FC = () => {
  const [triggerGetAnswersQuery, { data, isLoading }] =
    useLazyGetAnswersQuery();
  const { query, isReady } = useRouter();
  const indexId = query.id as string;

  useEffect(() => {
    if (isReady) {
      triggerGetAnswersQuery({ index_id: +indexId });
    }
  }, [isReady]);

  const handleNewAnswerClick = () => {
    router.push(`/new-answer/${indexId}`);
  };

  return (
    <div>
      <h1>ここは質問回答覧</h1>
      {indexId && (
        <button type="button" onClick={handleNewAnswerClick}>
          この見出しに回答する
        </button>
      )}
      {data &&
        data.map((answer) => (
          <AnswerItem key={answer.answer_id} answer={answer} />
        ))}
      {isLoading ? 'ロード中...' : null}
    </div>
  );
};

export default QuestionAnswer;
