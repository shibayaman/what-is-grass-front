import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  className?: string;
  featured?: boolean;
};

const Card: FC<Props> = ({ className, featured = false, children }) => {
  const cardStyle = classNames(
    'rounded py-4 px-6 bg-white shadow-lg',
    className,
    `${
      featured
        ? 'shadow-lg border-2 border-orange-400'
        : 'shadow-lg border border-gray-300'
    }`
  );

  return <div className={cardStyle}>{children}</div>;
};

export default Card;
