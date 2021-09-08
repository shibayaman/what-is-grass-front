/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DefaultRequestBody,
  RequestParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from 'msw';

export type Resolver<
  RequestBody = DefaultRequestBody,
  ResponseBody = any,
  Params = RequestParams
> = ResponseResolver<
  RestRequest<RequestBody, Params>,
  RestContext,
  ResponseBody
>;

export type EmptyContent = Record<string, never>;
