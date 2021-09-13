import { yupResolver } from '@hookform/resolvers/yup';
import {
  Index,
  searchTriggered,
  useDispatch,
  useGetIndicesQuery,
  useGetLanguagesQuery,
  useSelector,
} from '@what-is-grass/shared';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { shallowEqual } from 'react-redux';
import * as yup from 'yup';
import Button from '../components/Button';
import SelectBox from '../components/SelectBox';
import TextInput from '../components/TextInput';

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

  const { data: indices, isLoading: isIndicesLoading } = useGetIndicesQuery(
    latestSearchRequest!,
    {
      skip: latestSearchRequest === null,
    }
  );
  const { data: languages } = useGetLanguagesQuery();

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
    indices && props.setQuestions(indices);
  }, [indices]);

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
      <div className="flex space-x-2">
        <SelectBox name="languageId" ref={register}>
          {languages &&
            languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.language}
              </option>
            ))}
        </SelectBox>
        <TextInput
          type="text"
          width="lg"
          name="keyword"
          ref={register}
          placeholder="言葉を検索"
        />
        <Button variant="primary" type="submit" disabled={isIndicesLoading}>
          検索
        </Button>
      </div>
      <div className="flex space-x-2 mt-2">
        <SelectBox name="sortId" ref={register}>
          <option value="1">新しい順</option>
          <option value="2">役に立った順</option>
          <option value="3">回答数の多い順</option>
        </SelectBox>
        <SelectBox name="includeNoAnswerId" ref={register}>
          <option value="1">全ての言葉</option>
          <option value="2">回答のある言葉</option>
          <option value="3">回答のない言葉</option>
        </SelectBox>
      </div>
    </form>
  );
};

export default SearchBar;
