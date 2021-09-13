export type CommunityTag = {
  id: number;
  community_tag_name: string;
};

export type GetCommunityTagsRequest = void;
export type GetCommunityTagsResponse = {
  community_tags: CommunityTag[];
};
