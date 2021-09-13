export const languages = [
  { id: 1, language: 'English' },
  { id: 2, language: '日本語' },
  { id: 3, language: '中文' },
];

export const categories = [
  { id: 1, category_tag_name: 'スラング' },
  { id: 2, category_tag_name: 'フォーマル' },
  { id: 3, category_tag_name: '丁寧' },
  { id: 4, category_tag_name: 'カジュアル' },
  { id: 5, category_tag_name: '攻撃的' },
  { id: 6, category_tag_name: '知識をひけらかす' },
  { id: 7, category_tag_name: '知的' },
  { id: 8, category_tag_name: '書き言葉' },
  { id: 9, category_tag_name: '話し言葉' },
  { id: 10, category_tag_name: '詩的な表現' },
  { id: 11, category_tag_name: 'ことわざ' },
  { id: 12, category_tag_name: '死語' },
  { id: 13, category_tag_name: '古語' },
  { id: 14, category_tag_name: '化学' },
  { id: 15, category_tag_name: '専門用語' },
];

export const community_tags = [
  { id: 1, community_tag_name: '学生' },
  { id: 2, community_tag_name: '会社員' },
  { id: 3, community_tag_name: 'エンジニア' },
  { id: 4, community_tag_name: 'サービス業' },
  { id: 5, community_tag_name: '医療業界' },
  { id: 6, community_tag_name: '金融業界' },
  { id: 7, community_tag_name: '第一次産業界' },
  { id: 8, community_tag_name: '子供' },
  { id: 9, community_tag_name: '若者' },
  { id: 10, community_tag_name: '大人' },
  { id: 11, community_tag_name: 'ヤンキー' },
  { id: 12, community_tag_name: '中年' },
  { id: 13, community_tag_name: '老人' },
  { id: 14, community_tag_name: 'オタク' },
  { id: 15, community_tag_name: 'アスリート' },
  { id: 16, community_tag_name: '男性' },
  { id: 17, community_tag_name: '女性' },
];

export const categoryTranslator = (rawCategory: string): string => {
  const translationTable = {
    slang: 'スラング',
    formal: 'フォーマル',
    polite: '丁寧',
    casual: 'カジュアル',
    offensive: '攻撃的',
    intelligent: '知的',
    pedantic: '知識をひけらかす',
    'writtern language': '書き言葉',
    'spoken language': '話し言葉',
    poetic: '詩的な表現',
    proverb: 'ことわざ',
    obsolete: '死語',
    archaic: '古語',
    science: '化学',
    'technical term': '専門用語',
  };

  return translate(translationTable, rawCategory);
};

export const communityTranslator = (rawCommunity: string): string => {
  const translationTable = {
    student: '学生',
    'office worker': '会社員',
    engineer: 'エンジニア',
    'hospitality industry': 'サービス業',
    'medical industry': '医療業界',
    'financial industry': '金融業界',
    'primary industry': '第一次産業',
    child: '子供',
    teenager: '若者',
    adult: '大人',
    noughty: 'ヤンキー',
    'middle age': '中年',
    elderly: '老人',
    enthusiast: 'オタク',
    athelete: 'アスリート',
    male: '男性',
    female: '女性',
  };

  return translate(translationTable, rawCommunity);
};

const translate = (table: Record<string, string>, word: string) => {
  if (Object.keys(table).includes(word)) {
    return table[word];
  }

  return '不明なタグ';
};
