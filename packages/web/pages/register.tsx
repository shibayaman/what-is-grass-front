import { yupResolver } from '@hookform/resolvers/yup';
import {
  loggedIn,
  useDispatch,
  useRegisterMutation,
} from '@what-is-grass/shared';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import GuestOnlyPage from '../components/GuestOnlyPage';
import Layout from '../components/Layout';

type FormValue = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

const newUserFormSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')]),
});

const RegisterPage: React.FC = () => {
  const [createAccount, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const {
    register,
    errors,
    trigger,
    formState: { isSubmitted },
    handleSubmit,
  } = useForm<FormValue>({
    resolver: yupResolver(newUserFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = async ({
    username,
    email,
    password,
  }) => {
    try {
      const user = await createAccount({ username, email, password }).unwrap();
      dispatch(loggedIn(user));
    } catch {
      //
    }
  };

  return (
    <GuestOnlyPage redirectTo="my-top">
      <Layout title="New User">
        <h1>ユーザー登録画面</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-information">
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
