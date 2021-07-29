import { Answer } from '@what-is-grass/shared';
import React from 'react';

type Props = {
  answer: Answer;
};

const AnswerItem: React.FC<Props> = ({ answer }) => {
  return (
    <div>
      <h2>
        回答する見出しのid{answer.index_id} {answer.id}
      </h2>
      <p>
        回答内容：{answer.definition}
        {answer.origin}
      </p>
      <p>回答者のid： {answer.user_id}</p>
      <p>
        役に立った回数:{answer.informative_count}/{answer.date}
      </p>
    </div>
  );
};
export default AnswerItem;
