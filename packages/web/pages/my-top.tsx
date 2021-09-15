import {
  communityTranslator,
  useGetUserIndicesQuery,
  useSelector,
} from '@what-is-grass/shared';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';
import Tag from '../components/Tag';

const MyTopPage: FC = () => {
  const user = useSelector((state) => state.auth.user);

  const { data: recentUserIndices } = useGetUserIndicesQuery({
    index_limit: 5,
  });

  const router = useRouter();

  return (
    <PrivatePage redirectTo="/">
      <Layout>
        {user && (
          <div className="grid grid-cols-9 gap-4 p-4">
            <div className="col-span-3 flex flex-col gap-4 items-center min-w-max">
              <Card withShadow={false}>
                <div className="mb-4 flex flex-col gap-2 items-center">
                  <img src="/sample-user-icon.png" width="80px"></img>
                  <h2 className="text-xl">{user.username}</h2>
                  <p>
                    {user.community_tags.map((community) => (
                      <Fragment key={community.id}>
                        <Tag
                          tagName={communityTranslator(
                            community.community_tag_name
                          )}
                          variant="primary"
                        />{' '}
                      </Fragment>
                    ))}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="mb-1">
                    話せる:{' '}
                    {user.first_languages.map((language) => (
                      <Fragment key={language.id}>
                        <Tag tagName={language.language} />{' '}
                      </Fragment>
                    ))}
                  </p>
                  <p>
                    学習中:{' '}
                    {user.second_languages.map((language) => (
                      <Fragment key={language.id}>
                        <Tag tagName={language.language} />{' '}
                      </Fragment>
                    ))}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => {
                    router.push('/edituser');
                  }}
                >
                  プロフィールを変更する
                </Button>
              </Card>
              <Card className="max-w-xs" withShadow={false}>
                <h2 className="text-xl">最近質問した見出し</h2>
                <div className="p-4 flex flex-col gap-4">
                  {recentUserIndices &&
                    (recentUserIndices.length === 0 ? (
                      <p>最近の質問はありません</p>
                    ) : (
                      recentUserIndices.map((index) => (
                        <Card key={index.id} className="">
                          <Link href={`/answers/${index.id}`}>
                            <a className="text-lg text-green-600">
                              {index.index}
                            </a>
                          </Link>
                          <br />
                          <p>{index.answer_count}件の回答があります</p>
                        </Card>
                      ))
                    ))}
                </div>
              </Card>
            </div>
            <div className="col-span-6">おすすめ見出し</div>
          </div>
        )}
      </Layout>
    </PrivatePage>
  );
};

export default MyTopPage;
