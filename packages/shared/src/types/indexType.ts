export type Index = {
  id: number;
  index: string;
  questioner: string;
  frequently_used_count: number;
  answer_count: number;
  language_id: number;
  best_answer: string;
  date: string;
};

export type NewIndexResponse = Omit<Index, 'best_answer'>;
export type NewIndexRequest = Pick<Index, 'index' | 'language_id'>;

export type GetIndicesRequest = {
  language_id: Index['language_id'];
  keyword: string;
  include_no_answer?: number;
  sort?: number;
  index_limit?: number;
};
export type GetIndicesResponse = {
  indices: Index[];
};

export type GetUserIndicesRequest = Partial<Omit<GetIndicesRequest, 'keyword'>>;
export type GetUserIndicesResponse = GetIndicesResponse;
