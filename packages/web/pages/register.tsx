import { yupResolver } from '@hookform/resolvers/yup';
import {
  loggedIn,
  useDispatch,
  useRegisterMutation,
} from '@what-is-grass/shared';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import GuestOnlyPage from '../components/GuestOnlyPage';
import LabeledFormElement from '../components/LabeldFormElement';
import Layout from '../components/Layout';
import SelectableButton from '../components/SelectableButton';

const languages = [
  { id: 1, language: '日本語' },
  { id: 2, language: 'English' },
  { id: 3, language: '中文' },
];

type FormValue = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  languages: NestedValue<number[]>;
};

const newUserFormSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
  languages: yup
    .array(yup.number())
    .min(1, '一つは選んでね')
    .transform((value) => value.filter(Boolean)),
});

const RegisterPage: React.FC = () => {
  const [createAccount, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const {
    register,
    errors,
    trigger,
    watch,
    formState: { isSubmitted },
    handleSubmit,
  } = useForm<FormValue>({
    defaultValues: { languages: [] },
    resolver: yupResolver(newUserFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = async ({
    username,
    email,
    password,
    languages,
  }) => {
    console.log(languages);
    try {
      const user = await createAccount({ username, email, password }).unwrap();
      dispatch(loggedIn(user));
    } catch {
      //
    }
  };

  const selectedLanguages = watch('languages')
    .filter(Boolean)
    .map((id) => +id);

  return (
    <GuestOnlyPage redirectTo="my-top">
      <Layout title="New User">
        <h1>ユーザー登録画面</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-initial flex-col item-start space-y-10">
            <div>
              <p>ユーザ名</p>
              <input
                className="username"
                name="username"
                ref={register()}
                type="text"
              />
              {errors.username?.message}
            </div>
            <div>
              <p>メールアドレス</p>
              <input
                className="email"
                name="email"
                type="text"
                ref={register()}
              />
              {errors.email?.message}
            </div>
            <div>
              <p>パスワード</p>
              <input
                className="password"
                name="password"
                type="password"
                ref={register()}
                // onChangeの発火元フォームのみrevalidateされるので
                // パスワード確認フォームは手動でrevalidateする
                onChange={() => {
                  if (isSubmitted) {
                    trigger('repeatPassword');
                  }
                }}
              />
              {errors.password?.message}
            </div>
            <br />
            <div>
              <p>パスワード確認</p>
              <input
                className="repeatpassword"
                name="repeatPassword"
                type="password"
                ref={register()}
              ></input>
              {errors.repeatPassword?.message}
            </div>
            <LabeledFormElement
              label="話せる言語 (複数可)"
              error={errors.languages?.message}
            >
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {languages.map((language, index) => (
                  <SelectableButton
                    key={language.id}
                    type="checkbox"
                    name={`languages.${index}`}
                    ref={register}
                    defaultValue={language.id}
                    label={language.language}
                    checked={selectedLanguages.includes(language.id) || false}
                    onChange={() => {
                      if (isSubmitted) {
                        trigger('languages');
                      }
                    }}
                  />
                ))}
              </div>
            </LabeledFormElement>
            <div>
              <input type="submit" value="登録" disabled={isLoading} />
            </div>
          </div>
        </form>
      </Layout>
    </GuestOnlyPage>
  );
};

export default RegisterPage;
