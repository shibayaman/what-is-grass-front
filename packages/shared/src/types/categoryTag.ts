export type CategoryTag = {
  id: number;
  category_tag_name: string;
};

export type GetCategoryTagsRequest = void;
export type GetCategoryTagsResponse = {
  category_tags: CategoryTag[];
};

export type EditCategoryTagRequest = {
  index_id: number;
  category_tag_id: CategoryTag['id'][];
};
export type EditCategoryTagResponse = {
  index_id: number;
  categorytags: CategoryTag[];
};
