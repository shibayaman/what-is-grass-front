export type Language = {
  id: number;
  language: string;
};

export type GetLanguagesRequest = void;
export type GetLanguagesResponse = {
  languages: Language[];
};
