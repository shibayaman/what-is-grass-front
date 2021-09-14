import { yupResolver } from '@hookform/resolvers/yup';
import {
  communityTranslator,
  loggedIn,
  useDispatch,
  useGetCommunityTagsQuery,
  useGetLanguagesQuery,
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
  first_languages: NestedValue<number[]>;
  second_languages: NestedValue<number[]>;
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
  first_languages: yup
    .array(yup.number())
    .min(1, '一つは選んでね')
    .transform((value) => value.filter(Boolean)),
  second_languages: yup
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
  const { data: languages } = useGetLanguagesQuery();
  const { data: communityTags } = useGetCommunityTagsQuery();
  const dispatch = useDispatch();

  const {
    register,
    errors,
    trigger,
    watch,
    formState: { isSubmitted },
    handleSubmit,
  } = useForm<FormValue>({
    defaultValues: {
      first_languages: [],
      second_languages: [],
      communityTags: [],
    },
    resolver: yupResolver(newUserFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = async ({
    username,
    email,
    password,
    first_languages,
    second_languages,
    communityTags,
  }) => {
    try {
      const { user } = await createAccount({
        username,
        email,
        password,
        first_languages: first_languages,
        second_languages: second_languages,
        community_tags: communityTags,
      }).unwrap();
      dispatch(loggedIn(user));
    } catch {
      //
    }
  };

  const selectedFirstLanguages = watch('first_languages')
    .filter(Boolean)
    .map((id) => +id);

  const selectedSecondLanguages = watch('second_languages')
    .filter(Boolean)
    .map((id) => +id);

  const selectedCommunities = watch('communityTags')
    .filter(Boolean)
    .map((id) => +id);

  return (
    <GuestOnlyPage redirectTo="my-top">
      <Layout title="New User">
        <h1 className="text-3xl mx-2 pt-4 mb-4">ユーザー登録</h1>
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
              error={errors.first_languages?.message}
            >
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {languages &&
                  languages.map((language, index) => (
                    <SelectableButton
                      key={language.id}
                      type="checkbox"
                      name={`first_languages.${index}`}
                      ref={register}
                      defaultValue={language.id}
                      label={language.language}
                      checked={
                        selectedFirstLanguages.includes(language.id) || false
                      }
                      onChange={() => {
                        if (isSubmitted) {
                          trigger('first_languages');
                        }
                      }}
                    />
                  ))}
              </div>
            </LabeledFormElement>
            <LabeledFormElement
              label="学習中の言語 (複数可)"
              error={errors.second_languages?.message}
            >
              <div className="flex flex-wrap gap-x-2 gap-y-2">
                {languages &&
                  languages.map((language, index) => (
                    <SelectableButton
                      key={language.id}
                      type="checkbox"
                      name={`second_languages.${index}`}
                      ref={register}
                      defaultValue={language.id}
                      label={language.language}
                      checked={
                        selectedSecondLanguages.includes(language.id) || false
                      }
                      onChange={() => {
                        if (isSubmitted) {
                          trigger('second_languages');
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
                {console.log(communityTags)}
                {communityTags &&
                  communityTags.map((communityTag, index) => (
                    <SelectableButton
                      key={communityTag.id}
                      type="checkbox"
                      name={`communityTags.${index}`}
                      ref={register}
                      defaultValue={communityTag.id}
                      label={communityTranslator(
                        communityTag.community_tag_name
                      )}
                      checked={
                        selectedCommunities.includes(communityTag.id) || false
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
