import { communityTranslator, useSelector } from '@what-is-grass/shared';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';
import Tag from '../components/Tag';

const MyTopPage: FC = () => {
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  return (
    <PrivatePage redirectTo="/">
      <Layout>
        <div className="grid grid-cols-9 gap-4 p-4">
          <div className="col-span-3 flex justify-center">
            {user && (
              <Card className="w-80" withShadow={false}>
                <div className="mb-4 flex flex-col gap-2 justify-center items-center">
                  <img src="/sample-user-icon.png" width="80px"></img>
                  <h2 className="text-lg">{user.username}</h2>
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
            )}
          </div>
          <div className="col-span-6">おすすめ見出し</div>
        </div>
      </Layout>
    </PrivatePage>
  );
};

export default MyTopPage;
