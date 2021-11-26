import {
  // loggedOut,
  searchTriggered,
  useDispatch,
  useGetLanguagesQuery,
  // useLogoutMutation,
  useSelector,
} from '@what-is-grass/shared';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useState } from 'react'; //後で消す
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Card from '../components/Card';
import SelectBox from '../components/SelectBox';
import TextInput from '../components/TextInput';

type Props = {
  children?: ReactNode;
  title?: string;
};

type FormValue = {
  keyword: string;
  languageId: number;
};

const Layout: React.FC<Props> = ({ children, title = 'default title' }) => {
  const [showLogoutDisabled, setShowLogoutDisabled] = useState(false);
  const { register, handleSubmit } = useForm<FormValue>();

  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const { data: languages } = useGetLanguagesQuery();

  // const [logout, { isLoading }] = useLogoutMutation();
  const onLogoutHandler = async () => {
    setShowLogoutDisabled((b) => !b);
    return;
    // try {
    //   await logout();
    //   dispatch(loggedOut());
    // } catch (err) {
    //   //
    // }
  };

  const onSubmit: SubmitHandler<FormValue> = ({ keyword, languageId }) => {
    dispatch(searchTriggered({ keyword, language_id: languageId }));
    router.push('/search');
  };

  return (
    <div className="bg-white bg-body bg-fixed bg-contain bg-no-repeat min-h-full">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-green-200 bg-header bg-contain bg-repeat-x sticky top-0 px-6 py-2 grid grid-cols-5 z-10">
        <Link href={user ? '/my-top' : '/'}>
          <a className="h-20 col-span-1">
            <img src="/logo.png" className="h-full object-cover" />
          </a>
        </Link>
        <div className="col-span-4 flex	items-center justify-between">
          <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-1">
            <SelectBox
              name="languageId"
              ref={register({ valueAsNumber: true })}
            >
              {languages &&
                languages.map((language) => (
                  <option key={language.id} value={language.id}>
                    {language.language}
                  </option>
                ))}
            </SelectBox>
            <TextInput
              type="text"
              name="keyword"
              ref={register}
              placeholder="言葉を検索"
            />
            <Button variant="secondary" type="submit">
              検索
            </Button>
          </form>
          <Button
            variant="accent"
            type="button"
            onClick={() => {
              router.push('/new-question');
            }}
          >
            質問する
          </Button>
          {user ? (
            <div className="flex flex-col relative">
              {user.username}{' '}
              <Button
                variant="secondary"
                size="xs"
                type="button"
                onClick={() => onLogoutHandler()}
                // disabled={isLoading}
              >
                ログアウト
              </Button>
              {showLogoutDisabled && (
                <div className="relative">
                  <Card className="absolute top-1 py-0.5 px-0.5 -left-16 text-sm">
                    デモ版ではログアウトはできません
                    <br />
                    <span
                      className="text-green-600 hover:text-green-700 cursor-pointer"
                      onClick={() => setShowLogoutDisabled(false)}
                    >
                      閉じる
                    </span>
                  </Card>
                </div>
              )}
            </div>
          ) : (
            <Button
              variant="secondary-outline"
              size="xs"
              type="button"
              onClick={() => {
                router.push('/');
              }}
            >
              ログイン
            </Button>
          )}
        </div>
      </header>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
