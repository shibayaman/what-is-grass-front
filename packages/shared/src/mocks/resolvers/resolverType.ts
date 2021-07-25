import {
  DefaultRequestBody,
  RequestParams,
  ResponseResolver,
  RestContext,
  RestRequest,
} from 'msw';

export type Resolver = ResponseResolver<
  RestRequest<DefaultRequestBody, RequestParams>,
  RestContext
>;
