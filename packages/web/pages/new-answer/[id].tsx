import { yupResolver } from '@hookform/resolvers/yup';
import {
  categoryTranslator,
  useAddAnswerMutation,
  useGetCategoryTagsQuery,
  useGetIndexQuery,
} from '@what-is-grass/shared';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../../components/Button';
import LabeledFormElement from '../../components/LabeldFormElement';
import Layout from '../../components/Layout';
import PrivatePage from '../../components/PrivatePage';
import SelectableButton from '../../components/SelectableButton';
import TextArea from '../../components/TextArea';

type FormValues = {
  definition: string;
  example: { sentence: string }[];
  origin: string;
  note: string;
  categoryId: number;
};

const newAnswerFormSchema = yup.object({
  definition: yup.string().required('ここは必須項目だよん'),
  example: yup.array(yup.object({ sentence: yup.string() })),
  origin: yup.string(),
  note: yup.string(),
  categoryId: yup.number().nullable().required('選んでね'),
});

const NewAnswerPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: index } = useGetIndexQuery(
    { index_id: +id },
    { skip: id === void 0 }
  );
  const [addAnswer, { isLoading, isError }] = useAddAnswerMutation();
  const { data: categories } = useGetCategoryTagsQuery();

  const { register, handleSubmit, control, getValues, watch, errors } =
    useForm<FormValues>({
      defaultValues: { example: [{ sentence: '' }] },
      resolver: yupResolver(newAnswerFormSchema),
    });

  const { fields, append, remove } = useFieldArray({
    name: 'example',
    control: control,
  });

  const onAppendExample = (defaultValue: { example?: string }) => {
    const { example } = getValues();
    const emptyFields = example.filter((e) => e.sentence === '');

    if (emptyFields.length === 0) {
      append(defaultValue);
    }
  };

  const onRemoveExample = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const disableRemove = fields.length === 1;
  const disableAppend =
    watch('example').filter((e) => e.sentence === '').length !== 0;

  const selectedCategory = +watch('categoryId');

  const onSubmit: SubmitHandler<FormValues> = async ({
    categoryId,
    ...data
  }) => {
    const example = data.example.filter((e) => e.sentence !== '');
    const newAnswer = {
      index_id: +id,
      category_tag_id: categoryId,
      ...data,
      example: example.map((e) => e.sentence),
    };
    const res = await addAnswer(newAnswer)
      .unwrap()
      .catch(() => {
        //
      });

    res && router.push(`/answers/${res.index_id}`);
  };

  return (
    <PrivatePage redirectTo="/">
      <Layout title="New Answer">
        {index && (
          <h1 className="text-3xl p-3">
            <span className="text-5xl text-green-700">{index.index}</span>
            について回答する
          </h1>
        )}
        <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-initial flex-col item-start space-y-10 w-9/12 bg-white border rounded border-gray-300 p-4">
            <LabeledFormElement
              label="言葉の意味"
              error={errors.definition?.message}
            >
              <TextArea
                name="definition"
                ref={register}
                isError={errors.definition !== void 0}
                rows={8}
                cols={70}
              />
            </LabeledFormElement>
            <LabeledFormElement
              label="言葉の由来"
              error={errors.origin?.message}
            >
              <TextArea
                name="origin"
                ref={register}
                isError={errors.origin !== void 0}
                rows={8}
                cols={70}
              />
            </LabeledFormElement>
            {fields.map((example, index) => (
              <div key={example.id}>
                <LabeledFormElement
                  label={`${index + 1}つ目の例文`}
                  error={errors.example?.[index]?.sentence?.message}
                >
                  <div className="flex space-x-2 items-end">
                    <TextArea
                      name={`example[${index}].sentence`}
                      ref={register()}
                      isError={errors.example?.[index] !== void 0}
                      rows={2}
                      cols={50}
                    />
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => onRemoveExample(index)}
                      disabled={disableRemove}
                    >
                      この例文を削除
                    </Button>
                  </div>
                </LabeledFormElement>
              </div>
            ))}
            <Button
              variant="secondary"
              type="button"
              onClick={() => onAppendExample({})}
              disabled={disableAppend}
            >
              もっと例文を追加
            </Button>
            <LabeledFormElement
              label="言葉についてのメモ"
              error={errors.note?.message}
            >
              <TextArea
                name="note"
                ref={register}
                isError={errors.note !== void 0}
                rows={2}
                cols={50}
              />
            </LabeledFormElement>
            <LabeledFormElement
              label="この言葉が一番当てはまる部類"
              error={errors.categoryId?.message}
            >
              <div className="inline-flex flex-wrap gap-x-2 gap-y-2">
                {categories &&
                  categories.map((category) => (
                    <SelectableButton
                      key={category.id}
                      type="radio"
                      name="categoryId"
                      ref={register}
                      defaultValue={category.id}
                      label={categoryTranslator(category.category_tag_name)}
                      checked={selectedCategory === category.id}
                    />
                  ))}
              </div>
            </LabeledFormElement>
            <div className="flex justify-center">
              <Button variant="primary" type="submit" disabled={isLoading}>
                回答
              </Button>
              {isLoading ? '送信中...' : null}
              {isError
                ? '送信できませんでした。しばらくしてからやり直してください'
                : null}
            </div>
          </div>
        </form>
      </Layout>
    </PrivatePage>
  );
};

export default NewAnswerPage;
