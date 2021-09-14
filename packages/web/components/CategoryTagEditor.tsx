import { yupResolver } from '@hookform/resolvers/yup';
import {
  categoryTranslator,
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
  defaultTagIds: number[];
};

const CategoryTagEditor: React.FC<Props> = ({ defaultTagIds = [] }) => {
  const user = useSelector((state) => state.auth.user);

  const { data: categoryTags } = useGetCategoryTagsQuery();

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
    console.log(categoryTagIds);
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
            <Button variant="primary" type="submit" disabled={false}>
              タグを登録
            </Button>
          </form>
        </Card>
      ) : null}
    </>
  );
};

export default CategoryTagEditor;
