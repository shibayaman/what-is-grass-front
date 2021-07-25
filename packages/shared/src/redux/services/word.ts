import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Index,
  NewIndexResponse,
  NewIndexRequest,
  GetIndicesRequest,
  GetIndicesResponse,
  GetUserIndicesRequest,
  GetUserIndicesResponse,
} from '../../types/indexType';
import {
  Answer,
  NewAnswerRequest,
  NewAnswerResponse,
  GetAnswersRequest,
  GetANswersResponse,
} from '../../types/answer';
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  GetLoginUserRequest,
  GetLoginUserResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../types/auth';

// mswが有効化される前にクエリーが飛んじゃう謎の挙動があったので
// デフォルトのfetchをPromiseでラップしてみたら期待通りに動いた。
// いまいちわからん。
const fetchFn: (
  input: RequestInfo,
  init?: RequestInit | undefined
) => Promise<Response> = async (input, init) => {
  return await fetch(input, init);
};

export const wordApi = createApi({
  reducerPath: 'wordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    fetchFn: fetchFn,
  }),
  endpoints: (builder) => ({
    getIndices: builder.query<Index[], GetIndicesRequest>({
      query: (params) => ({
        url: 'question',
        params,
      }),
      transformResponse: (res: GetIndicesResponse) => res.indices,
    }),
    getUserIndices: builder.query<Index[], GetUserIndicesRequest>({
      query: (params) => ({
        url: 'user/question-list',
        params,
      }),
      transformResponse: (res: GetUserIndicesResponse) => res.indices,
    }),
    addIndex: builder.mutation<NewIndexResponse, NewIndexRequest>({
      query: (body) => ({
        url: `question`,
        method: 'POST',
        body,
      }),
    }),
    getAnswers: builder.query<Answer[], GetAnswersRequest>({
      query: (params) => ({
        url: 'answer',
        params,
      }),
      transformResponse: (res: GetANswersResponse) => res.answer,
    }),
    addAnswer: builder.mutation<NewAnswerResponse, NewAnswerRequest>({
      query: (body) => ({
        url: 'answer',
        method: 'POST',
        body,
      }),
    }),
    getLoginUser: builder.query<GetLoginUserResponse, GetLoginUserRequest>({
      query: () => 'whoami',
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
  }),
});

// using TS 4.0
export const useGetIndicesQuery = wordApi.endpoints.getIndices.useQuery;
export const useLazyGetIndicesQuery = wordApi.endpoints.getIndices.useLazyQuery;
export const useGetUserIndicesQuery = wordApi.endpoints.getUserIndices.useQuery;
export const useAddIndexMutation = wordApi.endpoints.addIndex.useMutation;
export const useLazyGetAnswersQuery = wordApi.endpoints.getAnswers.useLazyQuery;
export const useGetAnswersQuery = wordApi.endpoints.getAnswers.useQuery;
export const useAddAnswerMutation = wordApi.endpoints.addAnswer.useMutation;
export const useGetLoginUserQuery = wordApi.endpoints.getLoginUser.useQuery;
export const useLoginMutation = wordApi.endpoints.login.useMutation;
export const useLogoutMutation = wordApi.endpoints.logout.useMutation;
export const useRegisterMutation = wordApi.endpoints.register.useMutation;
