import { yupResolver } from '@hookform/resolvers/yup';
import { loggedIn, useDispatch, useLoginMutation } from '@what-is-grass/shared';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../components/Button';
import LabeledFormElement from '../components/LabeldFormElement';
import TextInput from '../components/TextInput';

type FormValue = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
});

const Login: React.FC = () => {
  const [login, { isLoading, isError: isLoginError }] = useLoginMutation();
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = async ({
    email: emailInput,
    password,
  }) => {
    try {
      const { user } = await login({ email: emailInput, password }).unwrap();
      dispatch(loggedIn(user));
    } catch (err) {
      //
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-initial space-y-8 p-4 shadow-lg flex-col rounded border border-gray-400">
        <LabeledFormElement
          label="メールアドレス"
          error={errors.email?.message}
        >
          <TextInput
            name="email"
            ref={register}
            isError={errors.email !== void 0}
          />
        </LabeledFormElement>
        <LabeledFormElement
          label="パススワード"
          error={errors.password?.message}
        >
          <TextInput
            name="password"
            ref={register}
            type="password"
            isError={errors.password !== void 0}
          />
        </LabeledFormElement>
        <div>
          <Button variant="primary" type="submit" disabled={isLoading}>
            ログイン
          </Button>
          <span className="ml-4">
            新規登録は
            <Link href="/register">
              <a className="text-green-600">こちら</a>
            </Link>
          </span>
        </div>
      </div>
      {isLoginError && 'ログインに失敗しました。'}
    </form>
  );
};

export default Login;
