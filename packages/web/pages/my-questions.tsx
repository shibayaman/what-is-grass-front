import { useGetUserIndicesQuery } from '@what-is-grass/shared';
import React from 'react';
import { useForm } from 'react-hook-form';
import IndexItem from '../components/IndexItem';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';

const NOT_SELECTED = -1;

type FormValue = {
  languageId: number;
  includeNoAnswerId: number;
  sortId: number;
};

const MyQuestionsPage: React.FC = () => {
  const { register, watch } = useForm<FormValue>({
    defaultValues: {
      languageId: NOT_SELECTED,
      includeNoAnswerId: 1,
      sortId: 1,
    },
  });

  const languageId = watch('languageId');
  const includeNoAnswerId = watch('includeNoAnswerId');
  const sortId = watch('sortId');

  const requestBody = {
    //language_idだけ未指定で全てとかいう謎仕様にしてしまったので
    language_id: languageId === NOT_SELECTED ? void 0 : languageId,
    include_no_answer: includeNoAnswerId,
    sort: sortId,
  };

  const { data: questions } = useGetUserIndicesQuery(requestBody);

  return (
    <PrivatePage redirectTo="/">
      <Layout title="Search">
        <h1>質問した見出し一覧</h1>
        <label>
          言語で絞る:
          <select
            name="languageId"
            ref={register({ valueAsNumber: true })}
            className="search-lauguage"
          >
            <option value={NOT_SELECTED}>全て</option>
            <option value="1">日本語</option>
            <option value="2">英語</option>
          </select>
        </label>
        <br />
        <label>
          並び替え:
          <select
            name="sortId"
            ref={register({ valueAsNumber: true })}
            className="sort"
          >
            <option value="1">日付</option>
            <option value="2">役立Count</option>
            <option value="3">回答者数</option>
          </select>
        </label>
        <br />
        <label>
          回答状況で絞る:
          <select
            name="includeNoAnswerId"
            ref={register({ valueAsNumber: true })}
            className="include_no_answer"
          >
            <option value="1">全て</option>
            <option value="2">回答あり</option>
            <option value="3">回答なし</option>
          </select>
        </label>
        {questions &&
          questions.map((question) => (
            <IndexItem key={question.id} question={question} />
          ))}
      </Layout>
    </PrivatePage>
  );
};
export default MyQuestionsPage;
