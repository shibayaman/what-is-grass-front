import classNames from 'classnames';
import { FC } from 'react';

type Props = Omit<JSX.IntrinsicElements['select'], 'size'> & {
  size: 'xs' | 'base' | 'lg';
};

const SelectContainer: FC<Props> = ({ size, children, ...props }) => {
  const baseStyle =
    'px-2 py-1 border border-gray-400 rounded focus:outline-none focus:ring-1 focus:ring-green-400';
  const styles = classNames(baseStyle, {
    'text-xs': size === 'xs',
    'text-base': size === 'base',
    'text-xl': size === 'lg',
  });

  return (
    <select className={styles} {...props}>
      {children}
    </select>
  );
};

export default SelectContainer;
