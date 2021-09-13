import { GetCategoryTagsResponse } from '../../types/categoryTag';
import { GetCommunityTagsResponse } from '../../types/communityTag';
import { GetLanguagesResponse } from '../../types/language';
import { Resolver, EmptyContent } from './resolverType';

export const getCategoryTags: Resolver<EmptyContent, GetCategoryTagsResponse> =
  (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        category_tags: [
          {
            category_tag_name: 'slang',
            id: 1,
          },
          {
            category_tag_name: 'formal',
            id: 2,
          },
          {
            category_tag_name: 'polite',
            id: 3,
          },
          {
            category_tag_name: 'casual',
            id: 4,
          },
          {
            category_tag_name: 'offensive',
            id: 5,
          },
          {
            category_tag_name: 'intelligent',
            id: 6,
          },
          {
            category_tag_name: 'pedantic',
            id: 7,
          },
          {
            category_tag_name: 'writtern language',
            id: 8,
          },
          {
            category_tag_name: 'spoken language',
            id: 9,
          },
          {
            category_tag_name: 'poetic',
            id: 10,
          },
        ],
      })
    );
  };

export const getCommunityTags: Resolver<
  EmptyContent,
  GetCommunityTagsResponse
> = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      community_tags: [
        {
          community_tag_name: 'student',
          id: 1,
        },
        {
          community_tag_name: 'office worker',
          id: 2,
        },
        {
          community_tag_name: 'engineer',
          id: 3,
        },
        {
          community_tag_name: 'hospitality industr',
          id: 4,
        },
        {
          community_tag_name: 'medical industry',
          id: 5,
        },
        {
          community_tag_name: 'financial industry',
          id: 6,
        },
        {
          community_tag_name: 'primary industry',
          id: 7,
        },
        {
          community_tag_name: 'child',
          id: 8,
        },
        {
          community_tag_name: 'teenager',
          id: 9,
        },
        {
          community_tag_name: 'adult',
          id: 10,
        },
      ],
    })
  );
};

export const getLanguages: Resolver<EmptyContent, GetLanguagesResponse> = (
  _,
  res,
  ctx
) => {
  return res(
    ctx.status(200),
    ctx.json({
      languages: [
        {
          id: 1,
          language: 'English',
        },
        {
          id: 2,
          language: '日本語',
        },
      ],
    })
  );
};
