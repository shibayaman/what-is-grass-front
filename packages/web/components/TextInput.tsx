import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = Omit<JSX.IntrinsicElements['input'], 'size'> & {
  size: 'xs' | 'base' | 'lg';
  width: 'xs' | 'base' | 'lg';
  name: string;
  isError?: boolean;
};

const sizeSchemes = {
  xs: 20,
  base: 30,
  lg: 50,
};

const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ size, width, name, isError = false, ...props }, ref) => {
    const baseStyle = 'rounded focus:outline-none focus:ring-1';
    const borderStyle = isError
      ? 'border-2 border-red-600 focus:ring-red-400'
      : 'border border-gray-400 focus:ring-green-400';
    const styles = classNames(baseStyle, borderStyle, {
      'text-xs py-1 px-5': size === 'xs',
      'text-base py-2 px-5': size === 'base',
      'text-xl py-3 px-5': size === 'lg',
    });

    return (
      <input
        className={styles}
        size={sizeSchemes[width]}
        ref={ref}
        name={name}
        {...props}
      />
    );
  }
);

export default TextInput;
