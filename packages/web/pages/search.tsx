import Layout from '../components/Layout';
import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../components/SearchBar';
import IndexItem from '../components/IndexItem';
import { Index, useSelector } from '@what-is-grass/shared';

const Search: React.FC = () => {
  const [questions, setQuestions] = useState<Index[]>([]);
  const keyword = useSelector(
    (state) => state.questions.latestSearchRequest?.keyword ?? null
  );
  const user = useSelector((state) => state.auth.user);

  const updateQuestion = (questions: Index[]) => {
    setQuestions(questions);
  };

  const getNewQuestionUrl = () => {
    let url = '/new-question';
    if (keyword) {
      url += `?keyword=${keyword}`;
    }
    return url;
  };

  return (
    <Layout title="Search">
      <h1>ここは検索画面だよ！！</h1>
      <hr />
      <SearchBar setQuestions={updateQuestion} />
      {questions.map((question) => (
        <IndexItem key={question.index_id} question={question} />
      ))}
      {user ? (
        <div>
          言葉が見つかりませんか？{' '}
          <Link href={getNewQuestionUrl()}>こちら</Link>
          から{keyword && `${keyword}について`}新しく質問しましょう
        </div>
      ) : (
        <div>
          言葉が見つかりませんか？ <Link href="/">ログイン</Link>して
          {keyword && `${keyword}について`}新しく質問しましょうて
        </div>
      )}
    </Layout>
  );
};
export default Search;
