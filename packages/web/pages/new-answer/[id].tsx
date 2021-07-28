import { yupResolver } from '@hookform/resolvers/yup';
import { useAddAnswerMutation } from '@what-is-grass/shared';
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

const index = 'クラッシュバンディグー';
const categories = [
  { id: 1, category_tag_name: 'slang' },
  { id: 2, category_tag_name: 'formal' },
  { id: 3, category_tag_name: 'polite' },
  { id: 4, category_tag_name: 'casual' },
  { id: 5, category_tag_name: 'offensive' },
  { id: 6, category_tag_name: 'intelligent' },
  { id: 7, category_tag_name: 'writtern language' },
  { id: 8, category_tag_name: 'spoken language' },
  { id: 9, category_tag_name: 'poetic' },
  { id: 10, category_tag_name: 'proverb' },
  { id: 11, category_tag_name: 'obsolete' },
];

type FormValues = {
  definition: string;
  example: { sentence: string }[];
  origin: string;
  note: string;
  category: number;
};

const newAnswerFormSchema = yup.object({
  definition: yup.string().required('ここは必須項目だよん'),
  example: yup.array(yup.object({ sentence: yup.string() })),
  origin: yup.string(),
  note: yup.string(),
  category: yup.number().nullable().required('選んでね'),
});

const NewAnswerPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [addAnswer, { isLoading }] = useAddAnswerMutation();

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

  const selectedCategory = +watch('category');

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const example = data.example.filter((e) => e.sentence !== '');
    const newAnswer = {
      index_id: +id,
      ...data,
      example: example.map((e) => e.sentence),
    };
    addAnswer(newAnswer);
  };

  return (
    <PrivatePage redirectTo="/">
      <Layout title="New Answer">
        <h1 className="text-2xl p-3">
          <span className="text-3xl text-green-700">{index}</span>
          について回答する
        </h1>
        <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-initial flex-col item-start space-y-10 w-9/12 bg-white border rounded border-gray-300 p-3">
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
              error={errors.category?.message}
            >
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {categories.map((category) => (
                  <SelectableButton
                    key={category.id}
                    type="radio"
                    name="category"
                    ref={register}
                    value={category.id}
                    label={category.category_tag_name}
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
            </div>
          </div>
        </form>
      </Layout>
    </PrivatePage>
  );
};

export default NewAnswerPage;
