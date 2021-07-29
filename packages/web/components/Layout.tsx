import {
  loggedOut,
  searchTriggered,
  useDispatch,
  useLogoutMutation,
  useSelector,
} from '@what-is-grass/shared';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import SelectBox from '../components/SelectBox';
import TextInput from '../components/TextInput';

//APIができたら消す
const languages = [
  { id: 1, language: '日本語' },
  { id: 2, language: 'English' },
  { id: 3, language: '中文' },
];

type Props = {
  children?: ReactNode;
  title?: string;
};

type FormValue = {
  keyword: string;
  languageId: number;
};

const Layout: React.FC<Props> = ({ children, title = 'default title' }) => {
  const { register, handleSubmit } = useForm<FormValue>();

  const router = useRouter();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const onLogoutHandler = async () => {
    try {
      await logout();
      dispatch(loggedOut());
    } catch (err) {
      //
    }
  };

  const onSubmit: SubmitHandler<FormValue> = ({ keyword, languageId }) => {
    dispatch(searchTriggered({ keyword, language_id: languageId }));
    router.push('/search');
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-green-500 px-2 py-4 flex justify-between">
        <Link href="/">
          <a className="flex-shrink-0">
            <img src="/logo.png" className="w-52" />
          </a>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-1">
          <SelectBox name="languageId" ref={register({ valueAsNumber: true })}>
            {languages.map((language) => (
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
          <div className="flex flex-col">
            {user.username}{' '}
            <Button
              variant="secondary"
              size="xs"
              type="button"
              onClick={() => onLogoutHandler()}
              disabled={isLoading}
            >
              ログアウト
            </Button>
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
      </header>
      {children}
    </div>
  );
};

export default Layout;
