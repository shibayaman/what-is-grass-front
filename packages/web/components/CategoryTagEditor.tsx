import { yupResolver } from '@hookform/resolvers/yup';
import {
  categoryTranslator,
  useEditCategoryTagsMutation,
  useGetCategoryTagsQuery,
  useSelector,
} from '@what-is-grass/shared';
import { useEffect } from 'react';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from './Button';
import Card from './Card';
import LabeledFormElement from './LabeldFormElement';
import SelectableButton from './SelectableButton';

type FormValue = {
  categoryTagIds: NestedValue<number[]>;
};

const editCategoryTagFormSchema = yup.object({
  categoryTagIds: yup
    .array(yup.number())
    .min(1, '一つ以上選んでください')
    .transform((value) => value.filter(Boolean)),
});

type Props = {
  indexId: number;
  defaultTagIds: number[];
  closeEditor?: () => void;
};

const CategoryTagEditor: React.FC<Props> = ({
  indexId,
  defaultTagIds = [],
  closeEditor,
}) => {
  const user = useSelector((state) => state.auth.user);

  const { data: categoryTags } = useGetCategoryTagsQuery();
  const [editCategoryTags, { isLoading, isError }] =
    useEditCategoryTagsMutation();

  const {
    register,
    errors,
    trigger,
    setValue,
    watch,
    formState: { isSubmitted },
    handleSubmit,
  } = useForm<FormValue>({
    defaultValues: {
      categoryTagIds: [],
    },
    resolver: yupResolver(editCategoryTagFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = async ({ categoryTagIds }) => {
    try {
      await editCategoryTags({
        index_id: indexId,
        category_tag_id: categoryTagIds,
      }).unwrap();
      closeEditor && closeEditor();
    } catch {
      //
    }
  };

  useEffect(() => {
    if (categoryTags) {
      const defaultSelectedTags = categoryTags
        .map((tag, index) => ({
          index,
          tag,
        }))
        .filter(({ tag }) => defaultTagIds.includes(tag.id));

      defaultSelectedTags.forEach(({ index, tag }) => {
        setValue(`categoryTagIds.${index}` as any, tag.id);
      });
    }
  }, [categoryTags, defaultTagIds, setValue]);

  const selectedCategoryTagIds = watch('categoryTagIds')
    .filter(Boolean)
    .map((id) => +id);

  return (
    <>
      {user ? (
        <Card className="mb-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <LabeledFormElement
              label="この見出しに当てはまる部類を選んでください (複数可)"
              error={errors.categoryTagIds?.message}
              positionErrorMessageAbsolute={false}
            >
              <div className="flex flex-wrap gap-x-2 gap-y-2 mb-2">
                {categoryTags &&
                  categoryTags.map((categoryTag, index) => (
                    <SelectableButton
                      key={categoryTag.id}
                      type="checkbox"
                      name={`categoryTagIds.${index}`}
                      ref={register}
                      defaultValue={categoryTag.id}
                      label={categoryTranslator(categoryTag.category_tag_name)}
                      checked={selectedCategoryTagIds.includes(categoryTag.id)}
                      onChange={() => {
                        if (isSubmitted) {
                          trigger('categoryTagIds');
                        }
                      }}
                    />
                  ))}
              </div>
            </LabeledFormElement>
            <Button variant="primary" type="submit" disabled={isLoading}>
              タグを登録
            </Button>
            {isLoading && <span>送信中...</span>}
            {isError && <span>更新に失敗しました</span>}
          </form>
        </Card>
      ) : null}
    </>
  );
};

export default CategoryTagEditor;
