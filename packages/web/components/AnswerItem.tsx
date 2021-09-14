import { Answer } from '@what-is-grass/shared';
import { FC, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';

type Props = {
  answer: Answer;
  featured?: boolean;
};

const AnswerItem: FC<Props> = ({ answer, featured = false }) => {
  const [isInformative, setIsInformative] = useState(false);
  const informativeCount = answer.informative_count + (isInformative ? 1 : 0);

  return (
    <Card featured={featured}>
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
    </Card>
  );
};
export default AnswerItem;
