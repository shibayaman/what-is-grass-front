import classNames from 'classnames';
import { FC } from 'react';

type Props = {
  className?: string;
  featured?: boolean;
  withShadow?: boolean;
};

const Card: FC<Props> = ({
  className,
  featured = false,
  withShadow = true,
  children,
}) => {
  const cardStyle = classNames(
    'rounded py-4 px-6 bg-white',
    className,
    { 'shadow-lg': withShadow },
    `${featured ? 'border-2 border-orange-400' : 'border border-gray-300'}`
  );

  return <div className={cardStyle}>{children}</div>;
};

export default Card;
