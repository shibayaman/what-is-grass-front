import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  tagName: string;
  variant?: 'primary' | 'secondary' | 'accent';
};

const Tag: FC<Props> = ({ tagName, variant = 'secondary' }) => {
  const style = classNames('text-sm py-0.5 px-1 rounded whitespace-nowrap', {
    'bg-green-300': variant === 'primary',
    'bg-gray-300': variant === 'secondary',
    'bg-orange-300': variant === 'accent',
  });
  return <span className={style}>{tagName}</span>;
};

export default Tag;
