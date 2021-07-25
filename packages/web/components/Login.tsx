import { yupResolver } from '@hookform/resolvers/yup';
import { loggedIn, useDispatch, useLoginMutation } from '@what-is-grass/shared';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

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

  const onSubmit: SubmitHandler<FormValue> = async ({ email, password }) => {
    try {
      const user = await login({ email, password }).unwrap();
      dispatch(
        loggedIn({ id: user.id, username: user.username, email: user.email })
      );
    } catch (err) {
      //
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="L-box">
        <div className="L-Input">
          <div className="L-Ew">
            <p>E-mail</p>
            <input type="text" name="email" ref={register} />
            {errors.email?.message}
          </div>
          <div className="L-Pw">
            <p>パスワード</p>
            <input type="password" name="password" ref={register} />
            {errors.password?.message}
          </div>
          <input type="submit" value="ログイン" disabled={isLoading} />
        </div>
      </div>
      {isLoginError && 'ログインに失敗しました。'}
    </form>
  );
};

export default Login;
