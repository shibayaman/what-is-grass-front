import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Answer,
  Example,
  GetAnswersRequest,
  GetAnswersResponse,
  GetExamplesRequest,
  GetExamplesResponse,
  NewAnswerRequest,
  NewAnswerResponse,
} from '../../types/answer';
import {
  GetLoginUserRequest,
  GetLoginUserResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../types/auth';
import {
  CategoryTag,
  GetCategoryTagsRequest,
  GetCategoryTagsResponse,
  EditCategoryTagRequest,
  EditCategoryTagResponse,
} from '../../types/categoryTag';
import {
  CommunityTag,
  GetCommunityTagsRequest,
  GetCommunityTagsResponse,
} from '../../types/communityTag';
import {
  DeleteFavoriteIndicesRequest,
  DeleteFavoriteIndicesResponse,
  GetFavoriteIndicesRequest,
  GetFavoriteIndicesResponse,
  GetIndicesRequest,
  GetIndicesResponse,
  GetIndexRequest,
  GetIndexResponse,
  GetUserIndicesRequest,
  GetUserIndicesResponse,
  Index,
  NewFavoriteIndicesRequest,
  NewFavoriteIndicesResponse,
  NewIndexRequest,
  NewIndexResponse,
  GetRecommendedIndicesRequest,
  GetRecommendedIndicesResponse,
} from '../../types/indexType';
import {
  GetLanguagesRequest,
  GetLanguagesResponse,
  Language,
} from '../../types/language';

// mswが有効化される前にクエリーが飛んじゃう謎の挙動があったので
// デフォルトのfetchをPromiseでラップしてみたら期待通りに動いた。
// いまいちわからん。
const fetchFn: (
  input: RequestInfo,
  init?: RequestInit | undefined
) => Promise<Response> = async (input, init) => {
  const baseInitOptions = { credentials: 'include' as const };
  const mergedInitOptions = init
    ? Object.assign(init, baseInitOptions)
    : baseInitOptions;
  return await fetch(input, mergedInitOptions);
};

export const wordApi = createApi({
  reducerPath: 'wordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/',
    fetchFn: fetchFn,
    prepareHeaders: (headers) => {
      const csrfTokenCookie = document.cookie
        .split('; ')
        .find((row) => row.startsWith('csrf_access_token'));

      if (csrfTokenCookie) {
        const csrfToken = csrfTokenCookie.split('=')[1];
        headers.set('X-CSRF-TOKEN', csrfToken);
      }

      return headers;
    },
  }),
  tagTypes: ['Index', 'Answer'],
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
    getFavoriteIndices: builder.query<Index[], GetFavoriteIndicesRequest>({
      query: (params) => ({
        url: 'favorite-question',
        params,
      }),
      transformResponse: (res: GetFavoriteIndicesResponse) => res.indices,
    }),
    getRecommendedIndices: builder.query<Index[], GetRecommendedIndicesRequest>(
      {
        query: (params) => ({
          url: 'recommend-question',
          params,
        }),
        transformResponse: (res: GetRecommendedIndicesResponse) => res.indices,
      }
    ),
    getIndex: builder.query<Index, GetIndexRequest>({
      query: (params) => ({
        url: '/specific-question',
        params,
      }),
      transformResponse: (res: GetIndexResponse) => res.index,
      providesTags: (_result, _error, args) => [
        { type: 'Index', id: args.index_id },
        'Index',
      ],
    }),
    addIndex: builder.mutation<NewIndexResponse, NewIndexRequest>({
      query: (body) => ({
        url: `question`,
        method: 'POST',
        body,
      }),
    }),
    addFavoriteIndex: builder.mutation<Index, NewFavoriteIndicesRequest>({
      query: (body) => ({
        url: `favorite-question`,
        method: 'POST',
        body,
      }),
      transformResponse: (res: NewFavoriteIndicesResponse) => res.index,
    }),
    removeFavoriteIndex: builder.mutation<
      DeleteFavoriteIndicesResponse,
      DeleteFavoriteIndicesRequest
    >({
      query: (params) => ({
        url: `favorite-question`,
        method: 'DELETE',
        params,
      }),
    }),
    getAnswers: builder.query<Answer[], GetAnswersRequest>({
      query: (params) => ({
        url: 'answer',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Answer' as const, id })),
              'Answer',
            ]
          : ['Answer'],

      transformResponse: (res: GetAnswersResponse) => res.answers,
    }),
    getExamples: builder.query<Example[], GetExamplesRequest>({
      query: (params) => ({
        url: 'example',
        params,
      }),
      transformResponse: (res: GetExamplesResponse) => res.examples,
    }),
    addAnswer: builder.mutation<Answer, NewAnswerRequest>({
      query: (body) => ({
        url: 'answer',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) =>
        result ? [{ type: 'Answer', id: result.index_id }] : [],
      transformResponse: (res: NewAnswerResponse) => res.answer,
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
    getLanguages: builder.query<Language[], GetLanguagesRequest>({
      query: () => ({
        url: 'language',
      }),
      transformResponse: (res: GetLanguagesResponse) => res.languages,
      keepUnusedDataFor: 60 * 30,
    }),
    getCommunityTags: builder.query<CommunityTag[], GetCommunityTagsRequest>({
      query: () => ({
        url: 'communitytag',
      }),
      transformResponse: (res: GetCommunityTagsResponse) => res.community_tags,
      keepUnusedDataFor: 60 * 30,
    }),
    getCategoryTags: builder.query<CategoryTag[], GetCategoryTagsRequest>({
      query: () => ({
        url: 'categorytag',
      }),
      transformResponse: (res: GetCategoryTagsResponse) => res.category_tags,
      keepUnusedDataFor: 60 * 30,
    }),
    editCategoryTags: builder.mutation<
      EditCategoryTagResponse,
      EditCategoryTagRequest
    >({
      query: (body) => ({
        url: '/categorytag/edit',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: 'Index', id: arg.index_id },
      ],
    }),
  }),
});

// using TS 4.0
export const useGetIndicesQuery = wordApi.endpoints.getIndices.useQuery;
export const useLazyGetIndicesQuery = wordApi.endpoints.getIndices.useLazyQuery;
export const useGetUserIndicesQuery = wordApi.endpoints.getUserIndices.useQuery;
export const useGetFavoriteIndicesQuery =
  wordApi.endpoints.getFavoriteIndices.useQuery;
export const useGetRecommendedIndicesQuery =
  wordApi.endpoints.getRecommendedIndices.useQuery;
export const useGetIndexQuery = wordApi.endpoints.getIndex.useQuery;
export const useLazyGetIndexQuery = wordApi.endpoints.getIndex.useLazyQuery;
export const useAddIndexMutation = wordApi.endpoints.addIndex.useMutation;
export const useAddFavoriteIndexMutation =
  wordApi.endpoints.addFavoriteIndex.useMutation;
export const useRemoveFavoriteIndexMutation =
  wordApi.endpoints.removeFavoriteIndex.useMutation;
export const useLazyGetAnswersQuery = wordApi.endpoints.getAnswers.useLazyQuery;
export const useGetAnswersQuery = wordApi.endpoints.getAnswers.useQuery;
export const useLazyGetExamplesQuery =
  wordApi.endpoints.getExamples.useLazyQuery;
export const useGetExamplesQuery = wordApi.endpoints.getExamples.useQuery;
export const useAddAnswerMutation = wordApi.endpoints.addAnswer.useMutation;
export const useGetLoginUserQuery = wordApi.endpoints.getLoginUser.useQuery;
export const useLoginMutation = wordApi.endpoints.login.useMutation;
export const useLogoutMutation = wordApi.endpoints.logout.useMutation;
export const useRegisterMutation = wordApi.endpoints.register.useMutation;
export const useGetLanguagesQuery = wordApi.endpoints.getLanguages.useQuery;
export const useGetCommunityTagsQuery =
  wordApi.endpoints.getCommunityTags.useQuery;
export const useGetCategoryTagsQuery =
  wordApi.endpoints.getCategoryTags.useQuery;
export const useEditCategoryTagsMutation =
  wordApi.endpoints.editCategoryTags.useMutation;
