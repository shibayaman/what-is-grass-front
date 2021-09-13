import {
  EditUserRequest,
  EditUserResponse,
  GetLoginUserResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../types/auth';
import { Resolver, EmptyContent } from './resolverType';

export const newUser: Resolver<RegisterRequest, RegisterResponse> = (
  _,
  res,
  ctx
) => {
  return res(
    ctx.status(201),
    ctx.json({
      user: {
        id: 123,
        username: 'AtamaHagetaro',
        email: 'hage@hage.com',
        first_languages: [{ id: 1, language: '日本語' }],
        second_languages: [{ id: 2, language: 'English' }],
        community_tags: [{ id: 1, community_tag_name: 'student' }],
        answer_filter: 0,
        access_token: 'a',
      },
    })
  );
};

export const editUser: Resolver<EditUserRequest, EditUserResponse> = (
  _,
  res,
  ctx
) => {
  return res(
    ctx.status(201),
    ctx.json({
      user: {
        id: 123,
        username: 'KaihatuYametarou',
        email: 'hoge@hoge.com',
        first_languages: [{ id: 1, language: '日本語' }],
        second_languages: [{ id: 2, language: 'English' }],
        community_tags: [{ id: 1, community_tag_name: 'student' }],
        answer_filter: 0,
        access_token: 'a',
      },
    })
  );
};

export const login: Resolver<LoginRequest, LoginResponse> = (_, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      user: {
        id: 123,
        username: 'AtamaHagetaro',
        email: 'hage@hage.com',
        first_languages: [{ id: 1, language: '日本語' }],
        second_languages: [{ id: 2, language: 'English' }],
        community_tags: [{ id: 1, community_tag_name: 'student' }],
        answer_filter: 0,
        access_token: 'a',
      },
    })
  );
};

export const logout: Resolver<EmptyContent, EmptyContent> = (_, res, ctx) => {
  return res(ctx.status(204));
};

export const getLoginUser: Resolver<
  EmptyContent,
  GetLoginUserResponse,
  EmptyContent
> = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      user: {
        id: 123,
        username: 'AtamaHagetaro',
        email: 'hage@hage.com',
        first_languages: [{ id: 1, language: '日本語' }],
        second_languages: [{ id: 2, language: 'English' }],
        community_tags: [{ id: 1, community_tag_name: 'student' }],
        answer_filter: 0,
        access_token: 'a',
      },
    })
  );
};
