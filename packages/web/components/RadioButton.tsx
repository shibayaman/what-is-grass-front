import classNames from 'classnames';
import { forwardRef } from 'react';

type Props = Omit<JSX.IntrinsicElements['input'], 'size'> & {
  size?: 'xs' | 'base' | 'lg';
  name: string;
  label: string;
  checked: boolean;
};

const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ size = 'base', name, label, checked, ...props }, ref) => {
    const baseStyle =
      'px-2 py-1 border border-gray-500 bg-transparent text-gray-500 rounded apearence-none';

    const styles = classNames(baseStyle, {
      'text-xs': size === 'xs',
      'text-base': size === 'base',
      'text-xl': size === 'lg',
      'bg-transparent text-gray-500': !checked,
      'text-blue-50 bg-gray-500': checked,
    });

    return (
      <label className={styles}>
        {label}
        <input
          type="radio"
          className="invisible absolute"
          ref={ref}
          name={name}
          {...props}
        ></input>
      </label>
    );
  }
);

export default RadioButton;
