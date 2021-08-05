import { FC } from 'react';

type Props = {
  tagName: string;
};

const Tag: FC<Props> = ({ tagName }) => {
  return (
    <span className="text-sm py-0.5 px-1 rounded bg-gray-300">{tagName}</span>
  );
};

export default Tag;
