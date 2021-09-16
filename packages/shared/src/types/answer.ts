export type Answer = {
  id: number;
  user_id: number;
  informative_count: number;
  index_id: number;
  definition: string;
  origin: string;
  example: Example[];
  note: string;
  date: string;
};

export type Example = {
  id: number;
  example_sentence: string;
  answer_id: Answer['id'];
  index_id: Answer['index_id'];
};

export type NewAnswerRequest = {
  index_id: Answer['index_id'];
  definition: Answer['definition'];
  origin?: Answer['origin'];
  note?: Answer['note'];
  category_tag_id: number;
  example?: Example['example_sentence'][];
};
export type NewAnswerResponse = { answer: Answer };

export type GetAnswersRequest = Pick<Answer, 'index_id'>;
export type GetAnswersResponse = { answers: Answer[] };

export type GetExamplesRequest = GetAnswersRequest;
export type GetExamplesResponse = {
  examples: Example[];
};
