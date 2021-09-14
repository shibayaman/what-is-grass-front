import { categoryTranslator, Index } from '@what-is-grass/shared';
import Link from 'next/link';
import { FC, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import Tag from '../components/Tag';

type Props = {
  question: Index;
};

const IndexItem: FC<Props> = ({ question }) => {
  const [isFrequentUser, setIsFrequentUser] = useState(false);
  const frequentlyUsedCount =
    question.frequently_used_count + (isFrequentUser ? 1 : 0);

  return (
    <Card>
      <Link href={`/answers/${question.id}`}>
        <a className="inline-block text-3xl text-green-600 mb-2">
          {question.index}
        </a>
      </Link>
      <div className="flex space-x-2">
        {question.category_tags.map(({ id, category_tag_name }) => {
          return (
            <Tag key={id} tagName={categoryTranslator(category_tag_name)} />
          );
        })}
      </div>
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
    </Card>
  );
};

export default IndexItem;
