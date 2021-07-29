import { Resolver } from './resolverType';

export const newAnswer: Resolver = (_, res, ctx) => {
  return res(
    ctx.status(201),
    ctx.json({
      answer_id: 1,
      user_id: 2,
      informative_count: 0,
      index_id: 3,
      definition:
        '髪の毛が亡くなったときに使う単語ですね。気にしてる人もいるので使う時は気をつけましょう。',
      origin:
        'その昔Hagel(ヘーゲル)さんの髪が薄かったのでHagel => 禿げるとなったそうです',
      example: [
        {
          id: 1,
          example_sentence: '彼は20代前半にして禿げていることを気に病んでいる',
        },
      ],
      language_id: 1,
      note: '薄毛は病院で治る時代です。',
      date: '2021-06-29T12:00:00.000+09:00',
    })
  );
};

export const getAnswer: Resolver = (_, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      answer: [
        {
          answer_id: 1,
          user_id: 1001,
          index_id: 101,
          origin: 'wが草に見えることが由来になりました',
          informative_count: 10,
          definition:
            '私は笑っていますということを文章で伝えるための言葉です。なになにで草、といった使い方をします。',
          note: 'まるまるで草w、などと草に草を生やすと怒られます。',
          example: [
            {
              example_id: 101,
              example_sentence: '開発進まなくて草',
            },
          ],
          date: '2021-06-22T12:00:00.000+09:00',
        },
        {
          answer_id: 2,
          user_id: 1002,
          index_id: 101,
          origin: '笑 -> wara -> w -> 草って変形していきました。',
          informative_count: 3,
          definition:
            '草っていう時はだいたい面白いことがあった時ですね。相槌として使う人もいます。',
          note: 'ネットで草と書いてる人はだいたい真顔ですから気をつけてくださいね。',
          example: [
            {
              example_id: 102,
              example_sentence: '草超えて森超えてモリーファンタジー',
            },
          ],
          date: '2021-06-22T12:00:00.000+09:00',
        },
        {
          answer_id: 3,
          user_id: 1003,
          index_id: 101,
          origin: null,
          informative_count: 0,
          definition: '笑う',
          note: '草を超えることもあります',
          example: [
            {
              example_id: 103,
              example_sentence: 'それは草',
            },
          ],
          date: '2021-06-22T12:00:00.000+09:00',
        },
      ],
    })
  );
};
