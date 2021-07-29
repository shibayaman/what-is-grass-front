import { Index } from '@what-is-grass/shared';
import Link from 'next/link';
import { FC, useState } from 'react';
import Button from '../components/Button';

type Props = {
  question: Index;
};

const IndexItem: FC<Props> = ({ question }) => {
  const [isFrequentUser, setIsFrequentUser] = useState(false);
  const frequentlyUsedCount =
    question.frequently_used_count + (isFrequentUser ? 1 : 0);

  return (
    <Link href={`/answers/${question.id}`}>
      <div className="rounded py-4 px-6 border border-gray-300 shadow-md hover:cursor-pointer">
        <p className="text-3xl text-green-600 mb-2">{question.index}</p>
        <p className="text-lg my-2 mx-2">{question.best_answer}</p>
        <div className="relative whitespace-nowrap">
          <span>{frequentlyUsedCount}人がよく使ってる</span>
          <br />
          <Button
            variant={isFrequentUser ? 'accent' : 'accent-outline'}
            size="xs"
            onClick={(e) => {
              e.stopPropagation();
              setIsFrequentUser(!isFrequentUser);
            }}
          >
            この単語よく使う!
          </Button>
          <span className="absolute right-0">
            他{Math.max(question.answer_count, 0)}件の回答
          </span>
        </div>
      </div>
    </Link>
  );
};

export default IndexItem;
