import {
  communityTranslator,
  useGetRecommendedIndicesQuery,
  useGetUserIndicesQuery,
  useSelector,
} from '@what-is-grass/shared';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Button from '../components/Button';
import Card from '../components/Card';
import IndexItem from '../components/IndexItem';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';
import Tag from '../components/Tag';

const MyTopPage: FC = () => {
  const user = useSelector((state) => state.auth.user);

  const { data: recentUserIndices } = useGetUserIndicesQuery({
    index_limit: 5,
  });

  const [tabIndex, setTabIndex] = useState(0);

  const { data: recommendedIndices, isFetching } =
    useGetRecommendedIndicesQuery(
      {
        community_tag: user?.community_tags[tabIndex].id || 0,
      },
      { skip: user === null }
    );

  const makeTabList = () => (
    <TabList>
      {user?.community_tags.map((community) => (
        <Tab key={community.id}>
          {communityTranslator(community.community_tag_name)}におすすめ
        </Tab>
      ))}
    </TabList>
  );

  const makeTabContents = () =>
    user?.community_tags.map((community) => (
      <TabPanel key={community.id} className="cursor-default">
        <div className="flex flex-col gap-4 mt-4">
          {isFetching
            ? '読み込み中...'
            : recommendedIndices?.map((index) => (
                <IndexItem key={index.id} question={index} />
              ))}
        </div>
      </TabPanel>
    ));

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
            <div className="col-span-6">
              <Card className="ml-4 mr-8 max-w-max" withShadow={false}>
                <h2 className="text-3xl mb-4">あなたに覚えて欲しい言葉</h2>
                <Tab>
                  <Tabs onSelect={(index) => setTabIndex(index)}>
                    {makeTabList()}
                    {makeTabContents()}
                  </Tabs>
                </Tab>
              </Card>
            </div>
          </div>
        )}
      </Layout>
    </PrivatePage>
  );
};

export default MyTopPage;
