import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';

type FormValue = {
  username: string;
  email: string;
};

const editUserFormSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().required().email(),
});

const Edit: React.FC = () => {
  const { register, errors, setValue, handleSubmit } = useForm<FormValue>({
    resolver: yupResolver(editUserFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = ({ username, email }) => {
    fetch('/user/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email }),
    });
  };

  useEffect(() => {
    const callUser = async () => {
      const res = await fetch('/user');
      const data = await res.json();
      setValue('username', data.username);
      setValue('email', data.email);
    };
    callUser();
  }, [setValue]);

  return (
    <PrivatePage redirectTo="/">
      <Layout title="UserEdit">
        <h1>ユーザ情報変更画面</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="well">
            <h4>ユーザ情報</h4>
            <div>
              <label>ユーザ名</label>
              <input type="text" name="username" ref={register} />
              {errors.username?.message}
            </div>
            <div>
              <label>メールアドレス</label>
              <input type="text" name="email" ref={register} />
              {errors.email?.message}
            </div>
            <button type="submit">変更</button>
          </div>
        </form>
      </Layout>
    </PrivatePage>
  );
};
export default Edit;
