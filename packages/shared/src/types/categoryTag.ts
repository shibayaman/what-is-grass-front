export type CategoryTag = {
  id: number;
  category_tag_name: string;
};

export type GetCategoryTagsRequest = void;
export type GetCategoryTagsResponse = {
  category_tags: CategoryTag[];
};
