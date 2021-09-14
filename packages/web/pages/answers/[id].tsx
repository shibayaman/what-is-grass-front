import {
  categoryTranslator,
  useAddFavoriteIndexMutation,
  useLazyGetIndexQuery,
  useLazyGetAnswersQuery,
  useSelector,
  useLazyGetExamplesQuery,
} from '@what-is-grass/shared';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AnswerItem from '../../components/AnswerItem';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CategoryTagEditor from '../../components/CategoryTagEditor';
import Layout from '../../components/Layout';
import Tag from '../../components/Tag';

const AnswersPage: React.FC = () => {
  const [
    triggerGetAnswersQuery,
    { data: answers, isLoading: isAnswerLoading },
  ] = useLazyGetAnswersQuery();
  const [triggerGetExamplesQuery, { data: examples }] =
    useLazyGetExamplesQuery();
  const [triggerGetIndexQuery, { data: index }] = useLazyGetIndexQuery();
  const [addToFavorite] = useAddFavoriteIndexMutation();
  const [favorited, setFavorited] = useState(false);
  const [isEditingCategoryTags, setIsEditingCategoryTags] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const { query, push: routerPush } = useRouter();
  const indexId = query.id as string;

  useEffect(() => {
    if (indexId) {
      triggerGetAnswersQuery({ index_id: +indexId });
      triggerGetExamplesQuery({ index_id: +indexId });
      triggerGetIndexQuery({ index_id: +indexId });
    }
  }, [
    indexId,
    triggerGetAnswersQuery,
    triggerGetExamplesQuery,
    triggerGetIndexQuery,
  ]);

  const handleNewAnswerClick = () => {
    routerPush(`/new-answer/${indexId}`);
  };

  const handleFavoriteClick = () => {
    addToFavorite({ index_id: +indexId });
    setFavorited(true);
  };

  const handleEditCategoryTagClick = () => {
    setIsEditingCategoryTags((isEditing) => !isEditing);
  };

  const makeNewAnswerButton = () => {
    if (!indexId) {
      return null;
    }

    return (
      <div className="mb-4 flex justify-end">
        {user ? (
          <div className="flex space-x-2">
            <Button
              variant="primary-outline"
              type="button"
              onClick={handleNewAnswerClick}
            >
              この見出しに回答する
            </Button>
            <Button
              variant={favorited ? 'accent' : 'accent-outline'}
              type="button"
              onClick={handleFavoriteClick}
            >
              お気に入りに追加
            </Button>
          </div>
        ) : (
          <div className="bg-red-100 rounded p-3 border border-red-400">
            <Link href="/">
              <a className="text-green-600">ログイン</a>
            </Link>
            すると見出しの意味を回答したり、タグの編集やお気に入り登録ができます
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-4">
        {index && (
          <div className="mb-2 ml-16">
            <h1 className="mb-4 text-6xl text-green-600 font-serif">
              {index.index}
            </h1>
            <div className="mb-2 flex space-x-2">
              {index.category_tags.map(({ id, category_tag_name }) => {
                return (
                  <Tag
                    key={id}
                    tagName={categoryTranslator(category_tag_name)}
                  />
                );
              })}
              {user && (
                <Button
                  variant="secondary-outline"
                  size="xs"
                  onClick={handleEditCategoryTagClick}
                >
                  {isEditingCategoryTags ? '編集をやめる' : 'タグを編集する'}
                </Button>
              )}
            </div>
          </div>
        )}
        {isEditingCategoryTags && (
          <CategoryTagEditor
            defaultTagIds={index?.category_tags.map((tags) => tags.id) || []}
          />
        )}
        {makeNewAnswerButton()}
        <div className="flex justify-center mb-6">
          <div className="grid grid-cols-5 gap-6 w-9/12">
            {isAnswerLoading ? 'ロード中...' : null}
            <div className="flex flex-col gap-4 col-span-3">
              {answers &&
                answers.map((answer, index) => (
                  <AnswerItem
                    key={answer.id}
                    answer={answer}
                    featured={index === 0}
                  />
                ))}
            </div>
            <Card className="flex flex-col gap-4 col-span-2">
              <span>例文</span>
              {examples &&
                (examples.length === 0 ? (
                  <p>まだ例文は投稿されていません。</p>
                ) : (
                  examples.map((example) => (
                    <p className="text-lg" key={example.id}>
                      {example.example_sentence}
                    </p>
                  ))
                ))}
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnswersPage;
