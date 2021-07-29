import { yupResolver } from '@hookform/resolvers/yup';
import {
  community_tags,
  languages,
  loggedIn,
  useDispatch,
  useRegisterMutation,
} from '@what-is-grass/shared';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../components/Button';
import GuestOnlyPage from '../components/GuestOnlyPage';
import LabeledFormElement from '../components/LabeldFormElement';
import Layout from '../components/Layout';
import SelectableButton from '../components/SelectableButton';
import TextInput from '../components/TextInput';

type FormValue = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  languages: NestedValue<number[]>;
  communityTags: NestedValue<number[]>;
};

const newUserFormSchema = yup.object({
  username: yup.string().required('こちらは必須項目です'),
  email: yup.string().required('こちらは必須項目です').email(),
  password: yup.string().required('こちらは必須項目です').min(8),
  repeatPassword: yup
    .string()
    .required('こちらは必須項目です')
    .oneOf([yup.ref('password')]),
  languages: yup
    .array(yup.number())
    .min(1, '一つは選んでね')
    .transform((value) => value.filter(Boolean)),
  communityTags: yup
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
    defaultValues: { languages: [], communityTags: [] },
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
      const { user } = await createAccount({
        username,
        email,
        password,
      }).unwrap();
      dispatch(loggedIn(user));
    } catch {
      //
    }
  };

  const selectedLanguages = watch('languages')
    .filter(Boolean)
    .map((id) => +id);

  const selectedCommunities = watch('communityTags')
    .filter(Boolean)
    .map((id) => +id);

  return (
    <GuestOnlyPage redirectTo="my-top">
      <Layout title="New User">
        <h1 className="text-xl mx-2 my-6">ユーザー登録</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-initial m-4 mflex-col item-start space-y-10">
            <LabeledFormElement
              label="ユーザーネーム"
              error={errors.username?.message}
            >
              <TextInput
                name="username"
                ref={register}
                isError={errors.username !== void 0}
              />
            </LabeledFormElement>
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
              label="パスワード"
              error={errors.password?.message}
            >
              <TextInput
                name="password"
                type="password"
                ref={register}
                onChange={() => {
                  if (isSubmitted) {
                    trigger('repeatPassword');
                  }
                }}
                isError={errors.password !== void 0}
              />
            </LabeledFormElement>
            <LabeledFormElement
              label="パスワード確認"
              error={errors.repeatPassword?.message}
            >
              <TextInput
                name="repeatPassword"
                type="password"
                ref={register}
                isError={errors.repeatPassword !== void 0}
              />
            </LabeledFormElement>
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
            <LabeledFormElement
              label="自分の特徴 (複数可)"
              error={errors.communityTags?.message}
            >
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {community_tags.map((community, index) => (
                  <SelectableButton
                    key={community.id}
                    type="checkbox"
                    name={`communityTags.${index}`}
                    ref={register}
                    defaultValue={community.id}
                    label={community.community_tag_name}
                    checked={
                      selectedCommunities.includes(community.id) || false
                    }
                    onChange={() => {
                      if (isSubmitted) {
                        trigger('communityTags');
                      }
                    }}
                  />
                ))}
              </div>
            </LabeledFormElement>
            <Button variant="primary" type="submit" disabled={isLoading}>
              登録
            </Button>
          </div>
        </form>
      </Layout>
    </GuestOnlyPage>
  );
};

export default RegisterPage;
