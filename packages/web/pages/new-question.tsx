import { yupResolver } from '@hookform/resolvers/yup';
import {
  useAddIndexMutation,
  useGetLanguagesQuery,
} from '@what-is-grass/shared';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../components/Button';
import LabeledFormElement from '../components/LabeldFormElement';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';
import SelectBox from '../components/SelectBox';
import TextInput from '../components/TextInput';

type FormValue = {
  index: string;
  languageId: number;
};

const newQuestionFormSchema = yup.object({
  index: yup.string().required(),
  languageId: yup.number().required(),
});

const NewQuestionPage: React.FC = () => {
  const { data: languages } = useGetLanguagesQuery();
  const { register, errors, setValue, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(newQuestionFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = async ({ index, languageId }) => {
    const res = await addIndex({ language_id: languageId, index })
      .unwrap()
      .catch(() => {
        //
      });
    res && router.push(`/answers/${res.index.id}`);
  };

  const router = useRouter();
  const keyword = router.query.keyword as string;
  const [addIndex, { isLoading, isError }] = useAddIndexMutation();

  useEffect(() => {
    if (keyword) {
      setValue('index', keyword);
    }
  }, [keyword, setValue]);

  return (
    <PrivatePage redirectTo="/">
      <Layout title="New Question">
        <h1 className="text-3xl p-3">知りたい言葉を質問をしよう</h1>
        <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-initial flex-col item-start space-y-10 w-9/12 bg-white border rounded border-gray-300 p-4">
            <LabeledFormElement label="質問したい言葉の言語">
              <SelectBox name="languageId" ref={register}>
                {languages &&
                  languages.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.language}
                    </option>
                  ))}
              </SelectBox>
            </LabeledFormElement>
            <LabeledFormElement label="質問" error={errors.index?.message}>
              <TextInput
                name="index"
                ref={register}
                isError={errors.index !== void 0}
              />
              とはどういう意味ですか
            </LabeledFormElement>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              aria-label="質問を投稿"
            >
              投稿
            </Button>
            {isLoading ? '送信中...' : null}
            {isError
              ? '送信に失敗しました。しばらくしてから再送信してください。'
              : null}
          </div>
        </form>
      </Layout>
    </PrivatePage>
  );
};

export default NewQuestionPage;
