import React from 'react';
import {
  searchTriggered,
  useSelector,
  useDispatch,
  useGetIndicesQuery,
  Index,
} from '@what-is-grass/shared';
import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {
  setQuestions: (questions: Index[]) => void;
};

type FormValue = {
  keyword: string;
  languageId: number;
  includeNoAnswerId: number;
  sortId: number;
};

const searchFormSchema = yup.object({
  keyword: yup.string(),
  languageId: yup.number(),
  includeNoAnswerId: yup.number(),
  sortId: yup.number(),
});

const SearchBar: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const latestSearchRequest = useSelector(
    (state) => state.questions.latestSearchRequest,
    shallowEqual
  );

  const { data, isLoading } = useGetIndicesQuery(latestSearchRequest!, {
    skip: latestSearchRequest === null,
  });

  const { register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      keyword: latestSearchRequest?.keyword ?? '',
      languageId: latestSearchRequest?.language_id ?? 1,
      includeNoAnswerId: latestSearchRequest?.include_no_answer ?? 1,
      sortId: latestSearchRequest?.sort ?? 1,
    },
    resolver: yupResolver(searchFormSchema),
  });

  useEffect(() => {
    data && props.setQuestions(data);
  }, [data]);

  const onSubmit: SubmitHandler<FormValue> = ({
    keyword,
    languageId,
    includeNoAnswerId,
    sortId,
  }) => {
    const body = {
      keyword,
      language_id: languageId,
      include_no_answer: includeNoAnswerId,
      sort: sortId,
    };

    dispatch(searchTriggered(body));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="search-box">
        <div className="search-input">
          <input
            name="keyword"
            ref={register}
            placeholder="なんかを聞きたいの？"
            aria-label="なんかを聞きたいの？"
          />
          <input type="submit" value="検索" disabled={isLoading} />
        </div>
      </div>
      <div>
        <select name="languageId" ref={register} className="search-lauguage">
          <option value="1">日本語</option>
          <option value="2">英語</option>
        </select>
      </div>
      <div>
        <select name="sortId" ref={register} className="sort">
          <option value="1">日付</option>
          <option value="2">役立Count</option>
          <option value="3">回答者数</option>
        </select>
      </div>
      <div>
        <select
          name="includeNoAnswer"
          ref={register}
          className="include_no_answer"
        >
          <option value="1">全て</option>
          <option value="2">回答あり</option>
          <option value="3">回答なし</option>
        </select>
      </div>
    </form>
  );
};

export default SearchBar;
