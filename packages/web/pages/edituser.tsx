import { yupResolver } from '@hookform/resolvers/yup';
import {
  communityTranslator,
  useGetCommunityTagsQuery,
  useGetLanguagesQuery,
  useSelector,
} from '@what-is-grass/shared';
import { NestedValue, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Button from '../components/Button';
import Card from '../components/Card';
import LabeledFormElement from '../components/LabeldFormElement';
import Layout from '../components/Layout';
import PrivatePage from '../components/PrivatePage';
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

const editUserFormSchema = yup.object({
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

const EditUserPage: React.FC = () => {
  const { data: languages } = useGetLanguagesQuery();
  const { data: communityTags } = useGetCommunityTagsQuery();

  const user = useSelector((state) => state.auth.user);

  const {
    register,
    errors,
    trigger,
    watch,
    formState: { isSubmitted },
    handleSubmit,
  } = useForm<FormValue>({
    defaultValues: {
      username: user?.username,
      email: user?.email,
      first_languages: user?.first_languages.map(({ id }) => id) || [],
      second_languages: user?.second_languages.map(({ id }) => id) || [],
      communityTags: user?.community_tags.map(({ id }) => id) || [],
    },
    resolver: yupResolver(editUserFormSchema),
  });

  const onSubmit: SubmitHandler<FormValue> = ({ username }) => {
    alert(`${username}さん。無効化してるって言ったでしょ`);
    // fetch('/user/edit', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ username, email }),
    // });
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
    <PrivatePage redirectTo="/">
      <Layout title="UserEdit">
        <h1 className="text-3xl p-3">プロフィール編集</h1>
        <form className="flex justify-center" onSubmit={handleSubmit(onSubmit)}>
          <Card
            withShadow={false}
            className="flex-initial flex-col item-start space-y-10 w-9/12 bg-white"
          >
            <LabeledFormElement
              label="ユーザー名"
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
              label="話せる言語 (複数可)"
              error={errors.first_languages?.message}
            >
              <div className="inline-flex flex-wrap gap-x-2 gap-y-2">
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
              <div className="inline-flex flex-wrap gap-x-2 gap-y-2">
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
              <div className="inline-flex flex-wrap gap-x-2 gap-y-2">
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
            <Button variant="primary" type="submit" disabled={true}>
              変更
            </Button>{' '}
            <span className="text-gray-400">
              (デモ版ではこの機能は無効化しています)
            </span>
          </Card>
        </form>
      </Layout>
    </PrivatePage>
  );
};
export default EditUserPage;
