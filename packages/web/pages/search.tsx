import { Index, useSelector } from '@what-is-grass/shared';
import classNames from 'classnames';
import Link from 'next/link';
import { useState } from 'react';
import IndexItem from '../components/IndexItem';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';

const SearchPage: React.FC = () => {
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

  const isQuestionsEmpty = questions.length === 0;

  return (
    <Layout title="Search | What Is Grass">
      <div className="flex justify-center">
        <div className="w-10/12 mt-4 mb-8">
          <SearchBar setQuestions={updateQuestion} />
          <div className="my-4 w-6/12 flex flex-col gap-4">
            {questions.map((question) => (
              <IndexItem key={question.id} question={question} />
            ))}
          </div>
          {keyword && (
            <div className={classNames({ 'text-2xl': isQuestionsEmpty })}>
              {isQuestionsEmpty
                ? '言葉が見つかりませんでした。'
                : '言葉が見つかりませんか？'}{' '}
              {user ? (
                <>
                  <Link href={getNewQuestionUrl()}>
                    <a className="text-green-600">こちら</a>
                  </Link>
                  から
                </>
              ) : (
                <>
                  <Link href={getNewQuestionUrl()}>
                    <a className="text-green-600">ログイン</a>
                  </Link>
                  して
                </>
              )}
              {keyword && `「${keyword}」について`}新しく質問しましょう
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default SearchPage;
