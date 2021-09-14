import { Answer } from '@what-is-grass/shared';
import { FC, useState } from 'react';
import Button from '../components/Button';

type Props = {
  answer: Answer;
  featured?: boolean;
};

const AnswerItem: FC<Props> = ({ answer, featured = false }) => {
  const cardStyle = `rounded py-4 px-6 bg-white ${
    featured
      ? 'shadow-lg border-2 border-orange-400'
      : 'shadow-md border border-gray-300'
  }`;

  const [isInformative, setIsInformative] = useState(false);
  const informativeCount = answer.informative_count + (isInformative ? 1 : 0);

  return (
    <div className={cardStyle}>
      {featured && <span className="block text-xl">ベストアンサー</span>}
      <p className="text-lg my-6 mx-2">{answer.definition}</p>
      {answer.origin && (
        <>
          <label className="block border-b">由来</label>
          <p className="my-6 mx-2">{answer.origin}</p>
        </>
      )}
      {answer.note && (
        <>
          <label className="block border-b">回答者の一言</label>
          <p className="my-6 mx-2">{answer.note}</p>
        </>
      )}
      <span className="block mt-8">
        {informativeCount}人が役に立ったと言っています
      </span>
      <Button
        variant={isInformative ? 'accent' : 'accent-outline'}
        size="xs"
        onClick={(e) => {
          e.stopPropagation();
          setIsInformative(!isInformative);
        }}
      >
        役に立った!
      </Button>
    </div>
  );
};
export default AnswerItem;
